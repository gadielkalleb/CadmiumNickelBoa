const { DatabaseSync } = require('node:sqlite');

const database = new DatabaseSync(':memory:');

database.exec(`
CREATE TABLE personagens(
  id INTEGER PRIMARY KEY,
  marvelId TEXT,
  nome TEXT,
  imagem TEXT,
  descricao TEXT,
  favoritos INTEGER
)
`);

module.exports = database;
