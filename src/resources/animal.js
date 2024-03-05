require('../models/animal');

const mongoose = require('mongoose');
const modelo = mongoose.model('animais');

// método CRUD
class Animal {
    static async criar(dados) {
        return await new modelo(dados).save();
    }

    static async buscarTodos() {
        return await modelo.find({});
    }

    static async buscarPorID(id, dados) { // Corrigido o nome do método para buscarPorID
        return await modelo.findOne({ _id: id });
    }


    static async atualizar(id, dados) {
        return await modelo.findOneAndUpdate(id, { $set: dados });
    }

    static async deletar(id) {
        return await modelo.findByIdAndDelete(id);
    }



}

module.exports = Animal;