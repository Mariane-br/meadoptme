// Importa o controlador de animais
const Animal = require('../controller/animal');

// Importa o multer para o upload de imagens
const multer = require('multer');

// Importa o express para criar as rotas
const express = require('express');

// Cria um roteador do Express
const router = express.Router();

// Importa o middleware de autenticação
const auth = require('../middleware/auth');

// Configuração do multer para salvar a imagem no diretório 'uploads'
const upload = multer({ dest: 'uploads/' });

// Rotas para as operações relacionadas aos animais
router.get('/', auth.autenticarToken, Animal.getCriar); // Rota para renderizar o formulário de criação de animais
router.get('/todos', auth.autenticarToken, Animal.buscarTodos); // Rota para buscar todos os animais
router.post('/', upload.single('imagem'), auth.autenticarToken, Animal.postCriar); // Rota para criar um novo animal (com upload de imagem)
router.delete('/:id', auth.autenticarToken, Animal.deleteId); // Rota para deletar um animal pelo ID
router.get('/:animalId', auth.autenticarToken, Animal.getBuscarId); // Rota para buscar um animal pelo ID
router.put('/:animalId', upload.single('imagem'), auth.autenticarToken, Animal.atualizarAnimal); // Rota para atualizar um animal pelo ID (com upload de imagem)

module.exports = router; // Exporta o roteador