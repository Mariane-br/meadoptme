const Animal = require('../resources/animal');
const auth = require('../middleware/auth');
const Usuario = require('../models/usuario');
const animal = require('../models/animal');
const fs = require('fs').promises;


exports.getCriar = async(req, res, next) => {
    try {
        return res.render('cadastrarPet');
    } catch (err) {
        next(err);
    }
}

exports.postCriar = async(req, res, next) => {
    try {
        const { especie, raca, localizacao, telefone, porte, sexo } = req.body;

        // Verifique se o arquivo foi enviado corretamente
        if (!req.file || !req.file.path) {
            return res.status(400).send('Nenhuma imagem foi enviada.');
        }

        const imagemData = await fs.readFile(req.file.path);
        const imagemBase64 = imagemData.toString('base64');

        // Preencha o campo proprietario com o ID do usuário logado
        const idUsuarioLogado = req.session.idUsuarioLogado; // Recupere o ID do usuário logado da sessão
        const animal = await Animal.criar({
            especie,
            raca,
            localizacao,
            telefone,
            porte,
            sexo,
            imagem: imagemBase64, // Salve o conteúdo da imagem (Base64) no banco de dados
            proprietario: idUsuarioLogado // Preencha o campo proprietario com o ID do usuário logado
        });

        return res.render('menu');

    } catch (err) {
        next(err);
    }
};

exports.buscarTodos = async(req, res, next) => {
    try {
        const todos = await Animal.buscarTodos();
        return res.json(todos);
    } catch (err) {
        next(err);
    }
}

exports.deleteId = async(req, res, next) => {
    try {
        const { id } = req.params;
        await Animal.deletar(id);
        res.status(204).end(); // Responder com status 204 (sem conteúdo) para indicar sucesso na remoção
    } catch (error) {
        next(error);
    }
}

exports.getBuscarId = async(req, res, next) => {
    try {
        const { animalId } = req.params; // Alterado para corresponder ao nome do parâmetro na rota
        const animal = await Animal.buscarPorID(animalId); // Corrigido para chamar o método estático corretamente
        return res.json(animal);
    } catch (error) {
        next(error);
    }
};

exports.atualizarAnimal = async(req, res, next) => {
    try {
        const { animalId } = req.params;
        const { especie, raca, localizacao, telefone, porte, sexo } = req.body;

        // Verifique se o arquivo foi enviado corretamente
        if (!req.file || !req.file.path) {
            return res.status(400).send('Nenhuma imagem foi enviada.');
        }

        const imagemData = await fs.readFile(req.file.path);
        const imagemBase64 = imagemData.toString('base64');

        const idUsuarioLogado = req.session.idUsuarioLogado; // Recupere o ID do usuário logado da sessão
        const animalAtualizado = await animal.findOneAndUpdate({ _id: animalId, proprietario: idUsuarioLogado }, // Condição de busca: ID do animal e proprietário
            { $set: { especie, raca, localizacao, telefone, porte, sexo, imagem: imagemBase64 } }, // Novos dados do animal
            { new: true } // Para retornar o animal atualizado
        );

        if (!animalAtualizado) {
            return res.status(404).send('Animal não encontrado ou você não tem permissão para atualizá-lo.');
        }

        return res.json(animalAtualizado);
    } catch (err) {
        next(err);
    }
};