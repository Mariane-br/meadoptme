const Animal = require('../controller/animal');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Importe o middleware de autenticação


// Configuração do multer para salvar a imagem no diretório 'uploads'
const upload = multer({ dest: 'uploads/' });

router.get('/', auth.autenticarToken, Animal.getCriar);
router.get('/todos', auth.autenticarToken, Animal.buscarTodos);
router.post('/', upload.single('imagem'), auth.autenticarToken, Animal.postCriar); // Middleware do multer para processar a imagem
router.delete('/:id', auth.autenticarToken, Animal.deleteId); // Rota para deletar um animal pelo ID
router.get('/:animalId', auth.autenticarToken, Animal.getBuscarId);
router.put('/:animalId', upload.single('imagem'), auth.autenticarToken, Animal.atualizarAnimal);


module.exports = router;