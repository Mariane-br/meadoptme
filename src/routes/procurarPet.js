// Importa o controlador de Procurar Pet
const ProcurarPet = require('../controller/procurarPet');

// Importa o express para criar as rotas
const express = require('express');

// Cria um roteador do Express
const router = express.Router();

// Importa o middleware de autenticação
const auth = require('../middleware/auth');

// Rota para renderizar a página de Procurar Pet
router.get('/', auth.autenticarToken, ProcurarPet.getObterPet); // Aplica o middleware auth aqui

module.exports = router; // Exporta o roteador