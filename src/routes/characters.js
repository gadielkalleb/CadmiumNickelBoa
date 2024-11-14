const router = require('express').Router();

const asyncHandler = require('express-async-handler');

const marvelClient = require('../client/client');

const database = require('../database');

const extractData = ({ id, name, description, thumbnail }) => {
  return {
    marvelId: id,
    nome: name,
    descricao: description,
    imagem: `${thumbnail.path}.${thumbnail.extension}`,
  }
}

router.get('/',
  asyncHandler(async (req, res, next) => {
    const characters = await marvelClient.get('/characters', { params: { offset: req.params.offset, limit: req.params.limit } });
    const charactersData = characters.data.data.results.map(extractData);
    
    res.json(charactersData);
  })
);

router.get('/:id', asyncHandler(async (req, res, net) => {
  const id = req.params.id ? `/${req.params.id}` : '';
  const character = await marvelClient.get(`/characters/${id}`);

  res.json(extractData(character.data.data.results[0]));
})
);

router.patch('/:id',asyncHandler( async (req, res, next) => {
  const body = req.body;
  const id = req.params.id

  const findCharacter = await database.prepare(`SELECT * FROM personagens WHERE marvelId = '${id}'`).all()

  console.log("🚀 ~ router.patch ~ findCharacter:", findCharacter)
  if (!findCharacter?.[0]) {
    const character = await marvelClient.get(`/characters/${id}`);
    const characterData = extractData(character.data.data.results[0]);

    database.prepare(`INSERT INTO personagens (marvelId, nome, descricao, imagem) VALUES ('${characterData.marvelId}', '${characterData.nome}', '${characterData.descricao}', '${characterData.imagem}')`).run()
  }

  await database.prepare(`UPDATE personagens SET nome = '${body.nome}', descricao = '${body.descricao}', imagem = '${body.imagem}' WHERE marvelId = '${id}'`).run()

  const query = await database.prepare(`SELECT * FROM personagens WHERE marvelId = '${id}'`).all()
  
  console.log("🚀 ~ router.patch ~ query:", query)

  res.json(query);
}));

router.patch('/favoritos', asyncHandler(async (req, res) => {
  const id = req.params.id ? `/${req.params.id}` : '';
  const character = await marvelClient.get(`/characters/${id}`);

  res.json({ ...character.data });
}))

module.exports = router;