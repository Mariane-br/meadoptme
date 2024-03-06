'use strict';

// Importa o Mongoose, uma biblioteca de modelagem de dados para MongoDB
const mongoose = require('mongoose');

// Importa as chaves de configuração do banco de dados
const keys = require('../../bin/keys');

// Exporta uma função assíncrona para conectar ao banco de dados MongoDB
module.exports.connect = async() => {
    try {
        // Utiliza o método connect do Mongoose para estabelecer a conexão com o banco de dados
        await mongoose.connect(keys.database.connection, {
            // Remova as opções useNewUrlParser e useUnifiedTopology
        });
        console.log('==> [+] mongodb'); // Log de sucesso ao conectar ao banco de dados
    } catch (error) {
        console.error('==> [-] mongodb', error.message); // Log de erro se a conexão falhar
    }
};