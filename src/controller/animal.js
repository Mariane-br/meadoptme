// Importa o modelo Animal definido em '../resources/animal'
const Animal = require('../resources/animal');

// Importa o modelo animal definido em '../models/animal'
const animal = require('../models/animal');

// Importa o módulo 'fs' para lidar com arquivos do sistema
const fs = require('fs').promises;

// Controlador para renderizar a página de criação de pet
exports.getCriar = async(req, res, next) => {
    try {
        return res.render('cadastrarPet');
    } catch (err) {
        next(err);
    }
}

// Controlador para lidar com a criação de um novo pet
exports.postCriar = async(req, res, next) => {
    try {
        const { especie, raca, localizacao, telefone, porte, sexo } = req.body;

        // Verifique se o arquivo da imagem foi enviado corretamente
        if (!req.file || !req.file.path) {
            return res.status(400).send('Nenhuma imagem foi enviada.');
        }

        // Lê os dados da imagem do arquivo enviado
        const imagemData = await fs.readFile(req.file.path);
        const imagemBase64 = imagemData.toString('base64');

        // Obtém o ID do usuário logado da sessão
        const idUsuarioLogado = req.session.idUsuarioLogado;

        // Cria um novo animal no banco de dados
        const animal = await Animal.criar({
            especie,
            raca,
            localizacao,
            telefone,
            porte,
            sexo,
            imagem: imagemBase64, // Salva a imagem como base64 no banco de dados
            proprietario: idUsuarioLogado // Define o proprietário como o ID do usuário logado
        });

        // Redireciona para o menu após a criação do animal
        return res.render('menu');

    } catch (err) {
        next(err);
    }
};

// Controlador para buscar todos os pets
exports.buscarTodos = async(req, res, next) => {
    try {
        // Busca todos os animais no banco de dados
        const todos = await Animal.buscarTodos();
        // Retorna a lista de animais como resposta
        return res.json(todos);
    } catch (err) {
        next(err);
    }
}

// Controlador para excluir um pet com base no ID
exports.deleteId = async(req, res, next) => {
    try {
        const { id } = req.params;
        // Deleta o animal do banco de dados
        await Animal.deletar(id);
        // Retorna uma resposta indicando que a exclusão foi bem-sucedida
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

// Controlador para buscar um pet por ID
exports.getBuscarId = async(req, res, next) => {
    try {
        // Obtém o ID do animal da solicitação
        const { animalId } = req.params;
        // Busca o animal pelo ID
        const animal = await Animal.buscarPorID(animalId);
        // Retorna o animal encontrado como resposta
        return res.json(animal);
    } catch (error) {
        next(error);
    }
};

// Controlador para atualizar as informações de um pet
exports.atualizarAnimal = async(req, res, next) => {
    try {
        const { animalId } = req.params;
        const { especie, raca, localizacao, telefone, porte, sexo } = req.body;

        // Verifique se o arquivo da imagem foi enviado corretamente
        if (!req.file || !req.file.path) {
            return res.status(400).send('Nenhuma imagem foi enviada.');
        }

        // Lê os dados da imagem do arquivo enviado
        const imagemData = await fs.readFile(req.file.path);
        const imagemBase64 = imagemData.toString('base64');

        // Obtém o ID do usuário logado da sessão
        const idUsuarioLogado = req.session.idUsuarioLogado;

        // Atualiza as informações do animal no banco de dados
        const animalAtualizado = await animal.findOneAndUpdate({ _id: animalId, proprietario: idUsuarioLogado }, // Condição de busca: ID do animal e proprietário
            { $set: { especie, raca, localizacao, telefone, porte, sexo, imagem: imagemBase64 } }, // Novos dados do animal
            { new: true } // Para retornar o animal atualizado
        );

        // Verifica se o animal foi encontrado e atualizado com sucesso
        if (!animalAtualizado) {
            return res.status(404).send('Animal não encontrado ou você não tem permissão para atualizá-lo.');
        }

        // Retorna o animal atualizado como resposta
        return res.json(animalAtualizado);
    } catch (err) {
        next(err);
    }
}