const app = require('./bin/index');
const keys = require('./bin/keys');
const connection = require('./src/middleware/connection');

app.listen(keys.server.PORT, () => {
    connection.connect();
    console.log('Estou funcionando');
})