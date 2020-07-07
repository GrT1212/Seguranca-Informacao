const { Router } = require('express');
const AccountTable = require('../account/table');
const AccountDeviceTable = require('../accountDevice/table');
const { hash } = require('../account/helper');
const { authenticatedAccount } = require('./helper');
const DeviceTable = require('../device/table')
const { encryptClientData } = require('../../bin/cryptography/criptography');
const router = new Router();

router.get('/logout', authenticatedAccount, (req, res, next) => {
  req.logout();
  res.json({ message: 'Logout successful' });
});

router.get('/authenticated', (req, res, next) => {
  if (!req.user) {
    res.json({});
  } else {
    res.json({ authenticated: true });
  }
});

router.get('/devices', authenticatedAccount, (req, res, next) => {
  AccountDeviceTable.getAccountDevices({
      accountId: req.user.id
  })
  .then(({ accountDevices }) => {
    return Promise.all(
      accountDevices.map(accountDevice => {
        return DeviceTable.getDevice({ deviceId: accountDevice.deviceId });
      })
    );
  })
  .then(devices => {
    res.json({ devices });
  })
  .catch(error => next(error));
});

router.get('/info', authenticatedAccount, (req, res, next) => {
  res.json({ info: { username: req.user.username } });
});

router.post('/portDataRequest', authenticatedAccount, (req, res, next) => {
  const { clientPublicKey } = req.body;
  AccountDeviceTable.getAccountDevices({
      accountId: req.user.id
  })
  .then(({ accountDevices }) => {
    return Promise.all(
      accountDevices.map(accountDevice => {
        return DeviceTable.getPortDevice({ deviceId: accountDevice.deviceId });
      })
    );
  })
  .then(devices => {
    let encryptedData = encryptClientData(clientPublicKey, JSON.stringify(devices));
    res.cookie('portDataInit', true, {
      expire: Date.now() + 3600000,
      httpOnly: true
    });
    res.json(encryptedData);
  })
  .catch(error => next(error));
});

router.get('/portDataOk', authenticatedAccount, (req, res, next) => {
  if ( !req.cookies.portDataInit ){
    const error = new Error('Portability not requested');
    error.statusCode = 400;
    throw error;
  }
  return AccountDeviceTable.getAccountDevices({
    accountId: account.id
  })
  .then(({ accountDevices }) => {
    accountDevices.map(accountDevice => {
      return DeviceTable.deleteDevice({ deviceId: accountDevice.deviceId });
    })
    res.clearCookie('portDataInit');

    res.json({ message: 'Successful data port' });
  }).catch(error => next(error));    
});

module.exports = router;