// usuario.js
const mongoose = require('mongoose');

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

const Usuarios = mongoose.model('usuarios', usuarioSchema);

module.exports = Usuarios;