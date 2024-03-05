// index.js

const express = require('express');
const bp = require('body-parser');
const session = require('express-session'); // Importe o express-session
const methodOverride = require('method-override');
const auth = require('../src/middleware/auth'); // Importe o middleware de autenticação

const app = express();

// configurando o parser
app.use(bp.json({ limit: '10mb' }));
app.use(bp.urlencoded({ extended: false }));

app.use(session({
    secret: '123456', // Segredo para assinar o cookie de sessão
    resave: false,
    saveUninitialized: false
}));

// Configuração do method-override
app.use(methodOverride('_method'));

// configurando o front-end
app.set('view engine', 'ejs');
app.set('views', 'views');

// definindo arquivos estáticos
app.use(express.static('public'));

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
        return next(); // Passe para o próximo middleware se a rota for /usuario ou /login
    }
    auth.autenticarToken(req, res, next); // Verifica autenticação para todas as outras rotas
});

// Rota default para renderizar a página de login
app.use('/login', (req, res) => {
    // Renderiza a página de login se o usuário não estiver autenticado
    if (!req.session.idUsuarioLogado) {
        return res.render('login');
    }
    // Se o usuário estiver autenticado, redirecione para a página de menu
    res.redirect('/menu');
});

// exportando aplicação
module.exports = app;