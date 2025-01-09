const express = require('express');
const bp = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const auth = require('../src/middleware/auth');
const path = require('path'); // Importação do módulo path

const app = express();

// Configurando o parser
app.use(bp.json({ limit: '10mb' }));
app.use(bp.urlencoded({ extended: false }));

// Configurando o express-session
app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: false
}));

// Configuração do method-override
app.use(methodOverride('_method'));

// Configurando o front-end
app.set('view engine', 'ejs');

// Adicionando logs para verificar o caminho das views
const viewsPath = path.join(__dirname, '../views');
console.log('Diretório de views configurado para:', viewsPath); // Log para depuração

app.set('views', viewsPath);

// Definindo arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rotas
const animal_route = require('../src/routes/animal');
app.use('/animal', animal_route);

const usuario_route = require('../src/routes/usuario');
app.use('/usuario', usuario_route);

const menu_route = require('../src/routes/menu');
app.use('/menu', menu_route);

const procurar_route = require('../src/routes/procurarPet');
app.use('/procurar', procurar_route);

const meusPets_route = require('../src/routes/meusPets');
app.use('/meus-pets', meusPets_route);

// Middleware global para verificar autenticação em todas as rotas, exceto /usuario e /login
app.use((req, res, next) => {
    if (req.path === '/usuario' || req.path === '/login') {
        return next();
    }
    auth.autenticarToken(req, res, next);
});

// Rota default para renderizar a página de login
app.use('/login', (req, res) => {
    if (!req.session.idUsuarioLogado) {
        return res.render('login'); // Certifique-se de que 'views/login.ejs' existe
    }
    res.redirect('/menu');
});

// Exportando a aplicação
module.exports = app;