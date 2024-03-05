const jwt = require('jsonwebtoken');
const keys = require('../../bin/keys');

exports.autenticarToken = (req, res, next) => {
    try {
        // Verifica se o usuário está autenticado
        if (!req.session.idUsuarioLogado) {
            return res.render('login'); // Redireciona para a página de login se não estiver autenticado
        }
        // Se estiver autenticado, passa para o próximo middleware
        next();
    } catch (err) {
        next(err);
    }
};