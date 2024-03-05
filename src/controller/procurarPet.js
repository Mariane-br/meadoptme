const Animal = require('../models/animal');

exports.getObterPet = async(req, res, next) => {
    try {
        const animais = await Animal.find({}).exec();
        const animaisAdotados = []; // Defina a variável aqui
        res.render('procurarPet', { animais: animais, animaisAdotados: animaisAdotados }); // Passe a variável para o template
    } catch (err) {
        res.status(500).send("Erro ao recuperar animais.");
    }
}