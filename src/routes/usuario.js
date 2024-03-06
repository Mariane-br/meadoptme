// Importa o controlador de Usuário
const Usuario = require('../controller/usuario');

// Importa o express para criar as rotas
const express = require('express');

// Cria um roteador do Express
const router = express.Router();

// Importa o middleware de autenticação
const auth = require('../middleware/auth');

// Rotas para criar um novo usuário
router.get('/', Usuario.getCriar);
router.post('/', Usuario.postCriar);

// Rotas para login de usuário
router.get('/logar', Usuario.getLogar);
router.post('/logar', Usuario.postLogar);

// Rota para deslogar o usuário
router.get('/deslogar', auth.autenticarToken, Usuario.getDeslogar);

// Rota para buscar todos os usuários
router.get('/todos', auth.autenticarToken, Usuario.buscarTodos);

// Rotas para perfil do usuário
router.get('/perfil', auth.autenticarToken, Usuario.getPerfil);
router.post('/perfil', auth.autenticarToken, Usuario.postPerfil);
router.post('/atualizar', auth.autenticarToken, Usuario.putAtualizarUsuario);
router.post('/excluir', auth.autenticarToken, Usuario.postExcluir);

module.exports = router; // Exporta o roteador