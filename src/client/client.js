const axios = require('axios');

const { environment } = require('./utils')

const marvelClient = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  params: {
    ...environment
  },
});

module.exports = marvelClient;