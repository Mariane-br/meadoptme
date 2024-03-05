const ProcurarPet = require('../controller/procurarPet');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Importe o middleware de autenticação


router.get('/', auth.autenticarToken, ProcurarPet.getObterPet); // Alteração aqui

module.exports = router;