const app = require('./bin/index');
const connection = require('./src/middleware/connection');

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    connection.connect();
    console.log('Estou funcionando');
})