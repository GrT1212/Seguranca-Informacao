const { Router } = require('express');
const AccountTable = require('../account/table');
const AccountDeviceTable = require('../accountDevice/table');
const Session = require('../account/session');
const { hash } = require('../account/helper');
const { setSession, authenticatedAccount } = require('./helper');
const DeviceTable = require('../device/table')
const router = new Router();

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  const usernameHash = hash(username);
  const passwordHash = hash(password);

  AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
      if (!account) {
        return AccountTable.storeAccount({ usernameHash, passwordHash })
      } else {
        const error = new Error('This username has already been taken');

        error.statusCode = 409;

        throw error;
      }
    })
    .then(() => {
      return setSession({ username, res });
    })
    .then(({ message }) => res.json({ message }))
    .catch(error => next(error));
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  AccountTable.getAccount({ usernameHash: hash(username) })
    .then(({ account }) => {
      if (account && account.passwordHash === hash(password)) {
        const { sessionId } = account;
      
        return setSession({ username, res, sessionId })
      } else {
        const error = new Error('Incorrect username/password');

        error.statusCode = 409;

        throw error;
      }
    })
    .then(({ message }) => res.json({ message }))
    .catch(error => next(error));
});

router.get('/logout', (req, res, next) => {
  const { username } = Session.parse(req.cookies.sessionString);

  AccountTable.updateSessionId({
    sessionId: null,
    usernameHash: hash(username)
  }).then(() => {
    res.clearCookie('sessionString');

    res.json({ message: 'Successful logout' });
  }).catch(error => next(error));
});

router.get('/authenticated', (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ authenticated }) => res.json({ authenticated }))
    .catch(error => next(error));
});

router.get('/devices', (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      return AccountDeviceTable.getAccountDevices({
        accountId: account.id
      });
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

router.get('/info', (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account, username }) => {
      res.json({ info: { username } });
    })
    .catch(error => next(error));
});

router.get('/portDataRequest', (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      return AccountDeviceTable.getAccountDevices({
        accountId: account.id
      });
    })
    .then(({ accountDevices }) => {
      return Promise.all(
        accountDevices.map(accountDevice => {
          return DeviceTable.getPortDevice({ deviceId: accountDevice.deviceId });
        })
      );
    })
    .then(devices => {
      res.cookie('portDataInit', true, {
        expire: Date.now() + 3600000,
        httpOnly: true
      });
      res.json({ devices });
    })
    .catch(error => next(error));
});

router.get('/portDataOk', (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
  .then(({ account }) => {
    if ( !req.cookies.portDataInit ){
      const error = new Error('Portability not requested');

      error.statusCode = 400;

      throw error;
    }
    return AccountDeviceTable.getAccountDevices({
      accountId: account.id
    });
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