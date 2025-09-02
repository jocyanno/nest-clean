const crypto = require('crypto');

// Gerar par de chaves RSA com 2048 bits
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// Converter para base64
const privateKeyBase64 = Buffer.from(privateKey).toString('base64');
const publicKeyBase64 = Buffer.from(publicKey).toString('base64');

console.log('Private Key (Base64):');
console.log(privateKeyBase64);
console.log('\nPublic Key (Base64):');
console.log(publicKeyBase64);

// Salvar em arquivos
const fs = require('fs');
fs.writeFileSync('private_key-base64.txt', privateKeyBase64);
fs.writeFileSync('public_key-base64.txt', publicKeyBase64);

console.log('\nChaves salvas em private_key-base64.txt e public_key-base64.txt'); 