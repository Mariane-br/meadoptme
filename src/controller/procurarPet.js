const Animal = require('../models/animal');

// Controlador para obter todos os pets disponíveis para adoção
exports.getObterPet = async(req, res, next) => {
    try {
        const animais = await Animal.find({}).exec();
        const animaisAdotados = []; // Inicializa a variável para animais adotados
        res.render('procurarPet', { animais: animais, animaisAdotados: animaisAdotados }); // Renderiza a página e passa as variáveis para o template
    } catch (err) {
        res.status(500).send("Erro ao recuperar animais."); // Retorna um status 500 em caso de erro
    }
}