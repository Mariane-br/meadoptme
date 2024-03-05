exports.getMenu = async(req, res, next) => {
    try {
        return res.render('menu');
    } catch (err) {
        next(err);
    }
}

exports.getCuidados = async(req, res, next) => {
    try {
        return res.render('cuidadosPet');
    } catch (err) {
        next(err);
    }
}