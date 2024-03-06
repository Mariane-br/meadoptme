const mongoose = require('mongoose');

// Define o esquema para o modelo "usuarios"
const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    telefone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true,
        trim: true
    },
});

// Cria o modelo "Usuarios" com base no esquema definido
const Usuarios = mongoose.model('usuarios', usuarioSchema);

module.exports = Usuarios;