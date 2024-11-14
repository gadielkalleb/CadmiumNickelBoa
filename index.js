const express = require('express');

const routes = require('./src/routes');

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
})

app.use('/', routes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: `Erro: ${err.message}` });
})

app.listen(PORT, async () => {
  console.log(`App listening on port ${PORT}`);
});
