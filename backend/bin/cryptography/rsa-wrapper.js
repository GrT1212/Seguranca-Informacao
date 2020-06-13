const crypto = require('crypto');
var fs = require('fs');

const rsaWrapper = {};

rsaWrapper.encrypt = (publicKey, message) => {
    fs.writeFileSync('tempKey.pem', publicKey);
    let tempKey = fs.readFileSync('tempKey.pem');
    let enc = crypto.publicEncrypt({
        key: tempKey,
        padding: crypto.RSA_PKCS1_OAEP_PADDING
    }, Buffer.from(message));
    fs.unlink('tempKey.pem', function (err) {
        if (err) throw err;
        console.log('Temp key deleted');
    });
    return enc.toString('base64');
};

module.exports = rsaWrapper;