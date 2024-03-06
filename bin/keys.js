'use strict';

// Exporta um objeto contendo as configurações do banco de dados e autenticação

module.exports = {
    // Configurações do banco de dados
    database: {
        // Conexão com o banco de dados MongoDB, usando a variável de ambiente connection ou uma conexão padrão
        connection: process.env.connection || 'mongodb+srv://barbosamariane538:jgSH78dXRjtIlruk@cluster0.tm3jzvo.mongodb.net/adoptme?retryWrites=true&w=majority&appName=Cluster0'
    }
};