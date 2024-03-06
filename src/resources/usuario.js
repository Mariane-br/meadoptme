// Importa o modelo de usuário
require('../models/usuario');

const mongoose = require('mongoose');
const modelo = mongoose.model('usuarios'); // Obtém o modelo de usuários

// Classe que define métodos CRUD para a entidade Usuário
class Usuario {
    static async criar(dados) {
        return await new modelo(dados).save(); // Cria um novo usuário com base nos dados fornecidos
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
        return await modelo.find({}); // Retorna todos os usuários
    }

    static async buscarPorID(id, dados) { // Busca um usuário por ID
        return await modelo.findOne({ _id: id });
    }

    static async atualizar(id, dados) { // Atualiza os dados de um usuário pelo ID
        return await modelo.findByIdAndUpdate(id, { $set: dados }, { new: true });
    }

    static async deletar(id) { // Deleta um usuário pelo ID
        return await modelo.findOneAndDelete({ _id: id });
    }

    static async validarRegistro(dados) { // Valida se o usuário já está registrado pelo email
        let { email } = dados;
        let usuario = await modelo.findOne({ email });
        return usuario;
    }
}

module.exports = Usuario; // Exporta a classe Usuario