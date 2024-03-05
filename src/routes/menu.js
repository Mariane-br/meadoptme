const Menu = require('../controller/menu');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Importe o middleware de autenticação

router.get('/', auth.autenticarToken, Menu.getMenu);
router.get('/cuidados', auth.autenticarToken, Menu.getCuidados);

module.exports = router;