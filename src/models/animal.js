// animal.js

const mongoose = require('mongoose');

// Defina o esquema para o modelo "animais"
const animalSchema = new mongoose.Schema({
    especie: {
        type: String,
        required: true,
        trim: true
    },
    raca: {
        type: String,
        required: true,
        trim: true
    },
    localizacao: {
        type: String,
        required: true,
        trim: true
    },
    telefone: {
        type: String,
        required: true,
    },
    porte: {
        type: String,
        required: true,
        trim: true
    },
    sexo: {
        type: String,
        enum: ['Macho', 'Fêmea', 'Não especificado'],
        default: 'Não especificado',
    },
    imagem: {
        type: String, // Armazene o caminho da imagem
        required: true
    },
    proprietario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios' // Referência ao modelo de usuário
    }
});

// Método estático para buscar animais por proprietário
// No modelo Animal (animal.js)

// Método estático para buscar animais por proprietário
animalSchema.statics.buscarPorProprietario = async function(proprietarioId) {
    try {
        const petsDoUsuario = await this.find({ proprietario: proprietarioId }).exec();
        return petsDoUsuario;
    } catch (error) {
        console.error('Erro ao buscar pets do usuário:', error);
        throw error;
    }
};


const Animais = mongoose.model('animais', animalSchema);

module.exports = Animais;