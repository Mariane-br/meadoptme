require('../models/usuario');

const mongoose = require('mongoose');
const modelo = mongoose.model('usuarios');

// método CRUD
class Usuario {
    static async criar(dados) {
        return await new modelo(dados).save();
    }

    static async logar(dados) {
        let { email, senha } = dados;
        let usuario = await modelo.findOne({ email, senha });

        if (!usuario) {
            return null; // Se o usuário não existir, retorna null
        }

        // Verifica se a senha fornecida corresponde à senha armazenada
        if (senha !== usuario.senha) {
            return null; // Se as senhas não coincidirem, retorna null
        }

        return usuario; // Se o usuário existir e a senha coincidir, retorna o usuário
    }


    static async buscarTodos() {
        return await modelo.find({});
    }

    static async buscarPorID(id, dados) {
        return await modelo.findOne({ _id: id });
    }

    static async atualizar(id, dados) {
        return await modelo.findByIdAndUpdate(id, { $set: dados }, { new: true });
    }

    static async deletar(id) {
        return await modelo.findOneAndDelete({ _id: id });
    }


    static async validarRegistro(dados) {
        let { email } = dados;
        let usuario = await modelo.findOne({ email });
        return usuario;
    }
}

module.exports = Usuario;