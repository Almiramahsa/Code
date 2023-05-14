const express = require('express');
const router = express.Router();

const refreshTokensHandler = require('./handler/refresh_tokens');

router.post('/', refreshTokensHandler.create);
module.exports = router;
