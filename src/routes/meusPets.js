const MeusPetsController = require('../controller/usuario');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Importe o middleware de autenticação

router.get('/', auth.autenticarToken, MeusPetsController.getMeusPets); // Aplica o middleware auth aqui

module.exports = router;