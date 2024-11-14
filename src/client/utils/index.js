const crypto = require('crypto'); 
// Definir os valoresconst 
const ts = new Date().getTime().toString(); 
// Timestamp atualconst 
const publicKey = '13ce570bc84e76c954ef2fd871c128c7';
const privateKey = '731f52ce96634a1f4aa9025fe2d9c9cbb7653f5d'; 
// Sua chave privada
// Concatenar ts + privateKey + publicKey
const toHash = ts + privateKey + publicKey; 
// Gerar o hash MD5const 
const hash = crypto.createHash('md5').update(toHash).digest('hex'); 
// Definir as variáveis para usar na requisiçãoconst 
const environment = {   ts,  hash,   apikey: publicKey };

module.exports = { environment };