const Usuario = require('../resources/usuario');
const Animal = require('../models/animal');
const auth = require('../middleware/auth');
const storage = require('localtoken');
const { render } = require('../../bin');


//funções para REGISTRO de Usuario
exports.getCriar = async(req, res, next) => {
    try {
        return res.render('criarUsuario');
    } catch (err) {
        next(err);
    }
}

exports.postCriar = async(req, res, next) => {
    try {
        let { email } = req.body;
        email = email.toLowerCase(); // Convertendo o email para minúsculas

        let resultado = await Usuario.validarRegistro({ email });
        if (!resultado) { // Se o usuário não for encontrado...
            const usuario = await Usuario.criar(req.body);
            // Deslogar o usuário após a criação bem-sucedida
            await exports.getDeslogar(req, res, next);
            return res.redirect('/usuario/logar');
        } else {
            return res.json({ error: 'Usuário já registrado!' });
        }
    } catch (err) {
        next(err);
    }
}

exports.buscarTodos = async(req, res, next) => {
    try {
        const todos = await Usuario.buscarTodos();
        return res.json(todos);
    } catch (err) {
        next(err);
    }
}

//funções para LOGIN de usuario
exports.getLogar = async(req, res, next) => {
    try {
        return res.render('login');
    } catch (err) {
        next(err);
    }
}

exports.postLogar = async(req, res, next) => {
    try {
        let usuario = await Usuario.logar(req.body);

        if (!usuario) {
            return res.send('Email ou senha incorretos!');
        }

        req.session.idUsuarioLogado = usuario._id; // Armazenando o ID do usuário logado na sessão

        return res.render('menu');
    } catch (err) {
        next(err);
    }
}

exports.getMeusPets = async(req, res, next) => {
    try {
        // Recuperar o ID do usuário da sessão
        const idUsuarioLogado = req.session.idUsuarioLogado;

        // Chamar a função buscarPorProprietario
        const animaisDoUsuario = await Animal.buscarPorProprietario(idUsuarioLogado);

        return res.render('meusPets', { pets: animaisDoUsuario }); // Renderizando a view meusPets.ejs com os pets como contexto
    } catch (err) {
        next(err);
    }
};

exports.getDeslogar = async(req, res, next) => {
    try {
        await storage.removeLocal('login');
        // Remover o ID do usuário da sessão ao deslogar
        delete req.session.idUsuarioLogado;
        return res.redirect('/usuario/logar');
    } catch (err) {
        next(err);
    }
}
exports.getPerfil = async(req, res, next) => {
    try {
        const idUsuarioLogado = req.session.idUsuarioLogado;
        const usuario = await Usuario.buscarPorID(idUsuarioLogado);

        // Renderizar a página de perfil com os dados do usuário
        return res.render('meuPerfil', { usuario: usuario, error: null, success: null }); // Passar a variável success como null
    } catch (err) {
        next(err);
    }
};

exports.postPerfil = async(req, res, next) => {
    try {
        const idUsuarioLogado = req.session.idUsuarioLogado;
        const dados = req.body;
        const usuario = await Usuario.buscarPorID(idUsuarioLogado);

        // Verificar se a senha atual está correta
        const senhaAtualInformada = dados.senhaAtual;
        const senhaAtualCorreta = usuario.senha; // Senha atual do usuário no banco de dados

        if (senhaAtualInformada !== senhaAtualCorreta) {
            return res.status(400).render('meuPerfil', { usuario: usuario, error: 'Senha atual incorreta' });
        }

        // Verificar se a nova senha foi fornecida
        if (dados.novaSenha.trim() !== '') {
            // Validar a nova senha
            const novaSenha = dados.novaSenha;
            const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Regex para validar senha
            if (!senhaRegex.test(novaSenha)) {
                return res.status(400).render('meuPerfil', { usuario: usuario, error: 'A nova senha deve conter no mínimo 8 caracteres, pelo menos uma letra maiúscula, uma letra minúscula e um número' });
            }
            // Atualizar a senha apenas se uma nova senha foi fornecida
            dados.senha = novaSenha;
        }

        // Remover a nova senha dos dados para evitar atualizar com uma senha em branco
        delete dados.novaSenha;

        // Atualizar as informações do usuário
        await Usuario.atualizar(idUsuarioLogado, dados);

        // Renderizar a página de perfil com uma mensagem de sucesso
        return res.render('meuPerfil', { usuario: usuario, success: 'Usuário alterado com sucesso' });
    } catch (err) {
        next(err);
    }
};

exports.putAtualizarUsuario = async(req, res, next) => {
    try {
        const idUsuario = req.session.idUsuarioLogado;
        const dadosAtualizados = req.body;

        if (!idUsuario) {
            return res.status(400).json({ error: 'ID do usuário não fornecido' });
        }

        if (!dadosAtualizados || Object.keys(dadosAtualizados).length === 0) {
            return res.status(400).json({ error: 'Nenhum dado para atualizar fornecido' });
        }

        // Verificar se uma nova senha foi fornecida e se a confirmação coincide
        if (dadosAtualizados.novaSenha && dadosAtualizados.novaSenha === dadosAtualizados.confirmarSenha) {
            // Atualizar a senha no banco de dados
            dadosAtualizados.senha = dadosAtualizados.novaSenha;
            // Remover os campos de nova senha e confirmação de senha dos dados atualizados
            delete dadosAtualizados.novaSenha;
            delete dadosAtualizados.confirmarSenha;
        } else if (dadosAtualizados.novaSenha && dadosAtualizados.novaSenha !== dadosAtualizados.confirmarSenha) {
            return res.status(400).json({ error: 'A nova senha e a confirmação de senha não coincidem' });
        }

        const usuarioAtualizado = await Usuario.atualizar(idUsuario, dadosAtualizados);

        if (!usuarioAtualizado) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        delete req.session.idUsuarioLogado;

        const successMessage = 'Alterações salvas com sucesso. Faça o login novamente.';
        return res.render('login', { message: successMessage, error: null, success: true });
    } catch (error) {
        next(error);
    }
};

exports.postExcluir = async(req, res, next) => {
    try {
        const idUsuario = req.session.idUsuarioLogado; // Recupera o ID do usuário logado
        await Usuario.deletar(idUsuario); // Chama a função de exclusão no modelo de usuário
        req.session.destroy(); // Destrói a sessão do usuário
        return res.redirect('/'); // Redireciona o usuário para a página inicial após a exclusão
    } catch (error) {
        next(error);
    }
};