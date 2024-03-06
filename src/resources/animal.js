// Importa o modelo de animal
require('../models/animal');

const mongoose = require('mongoose');
const modelo = mongoose.model('animais'); // Obtém o modelo de animais

// Classe que define métodos CRUD para a entidade Animal
class Animal {
    static async criar(dados) {
        return await new modelo(dados).save(); // Cria um novo animal com base nos dados fornecidos
    }

    static async buscarTodos() {
        return await modelo.find({}); // Retorna todos os animais
    }

    static async buscarPorID(id, dados) { // Busca um animal por ID
        return await modelo.findOne({ _id: id });
    }

    static async atualizar(id, dados) { // Atualiza os dados de um animal pelo ID
        return await modelo.findOneAndUpdate({ _id: id }, { $set: dados });
    }

    static async deletar(id) { // Deleta um animal pelo ID
        return await modelo.findByIdAndDelete(id);
    }
}

module.exports = Animal; // Exporta a classe Animal