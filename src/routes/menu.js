// Importa o controlador de menu
const Menu = require('../controller/menu');

// Importa o express para criar as rotas
const express = require('express');

// Cria um roteador do Express
const router = express.Router();

// Importa o middleware de autenticação
const auth = require('../middleware/auth');

// Rota para renderizar o menu principal
router.get('/', auth.autenticarToken, Menu.getMenu);

// Rota para renderizar a página de cuidados
router.get('/cuidados', auth.autenticarToken, Menu.getCuidados);

module.exports = router; // Exporta o roteador