const fs = require('fs');

const privateKey = fs.readFileSync('private_key-base64.txt', 'utf8').trim();
const publicKey = fs.readFileSync('public_key-base64.txt', 'utf8').trim();

const envContent = `DATABASE_URL="postgresql://docker:docker@localhost:5432/apis_db?schema=public"
JWT_PUBLIC_KEY="${publicKey}"
JWT_PRIVATE_KEY="${privateKey}"`;

fs.writeFileSync('.env', envContent);
console.log('Arquivo .env criado com sucesso!'); 