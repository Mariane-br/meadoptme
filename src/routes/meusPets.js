// Importa o controlador de Meus Pets
const MeusPetsController = require('../controller/usuario');

// Importa o express para criar as rotas
const express = require('express');

// Cria um roteador do Express
const router = express.Router();

// Importa o middleware de autenticação
const auth = require('../middleware/auth');

// Rota para renderizar a página de Meus Pets
router.get('/', auth.autenticarToken, MeusPetsController.getMeusPets); // Aplica o middleware auth aqui

module.exports = router; // Exporta o roteador