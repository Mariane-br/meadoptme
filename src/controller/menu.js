// Controlador para renderizar a página do menu
exports.getMenu = async(req, res, next) => {
    try {
        return res.render('menu');
    } catch (err) {
        next(err);
    }
}

// Controlador para renderizar a página de cuidados com animais de estimação
exports.getCuidados = async(req, res, next) => {
    try {
        return res.render('cuidadosPet');
    } catch (err) {
        next(err);
    }
}