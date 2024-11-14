const router = require('express').Router();

const characters = require('./characters');

router.use('/characters', characters)

module.exports = router;
