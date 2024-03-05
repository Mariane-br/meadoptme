'use strict';

module.exports = {
    server: {
        port: process.env.PORT || 3000
    },
    database: {
        connection: process.env.connection || 'mongodb+srv://barbosamariane538:jgSH78dXRjtIlruk@cluster0.tm3jzvo.mongodb.net/adoptme?retryWrites=true&w=majority&appName=Cluster0'
    },
    auth: {
        secret: "c1c2c3c4c5"
    }
};