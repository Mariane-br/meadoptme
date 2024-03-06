// Importa o arquivo principal do aplicativo
const app = require('./bin/index');

// Importa o módulo de conexão com o banco de dados
const connection = require('./src/middleware/connection');

// Inicia o servidor, ouvindo a porta definida no ambiente ou a porta 3000, em todas as interfaces de rede
app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    // Estabelece a conexão com o banco de dados
    connection.connect();
    // Exibe uma mensagem indicando que o servidor está funcionando
    console.log('Estou funcionando');
})