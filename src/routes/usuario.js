const Usuario = require('../controller/usuario');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', Usuario.getCriar);
router.post('/', Usuario.postCriar);

router.get('/logar', Usuario.getLogar);
router.post('/logar', Usuario.postLogar);

router.get('/deslogar', auth.autenticarToken, Usuario.getDeslogar);

router.get('/todos', auth.autenticarToken, Usuario.buscarTodos);

router.get('/perfil', auth.autenticarToken, Usuario.getPerfil);
router.post('/perfil', auth.autenticarToken, Usuario.postPerfil);
router.post('/atualizar', auth.autenticarToken, Usuario.putAtualizarUsuario);
router.post('/excluir', auth.autenticarToken, Usuario.postExcluir);


module.exports = router;