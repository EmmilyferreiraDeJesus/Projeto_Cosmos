var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            tipo: 'usuario',
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,

                        });

                    } else {
                        // Tenta autenticar como administrador
                        usuarioModel.autenticarAdm(email, senha)
                            .then(
                                function (resultadoAdmin) {
                                    if (resultadoAdmin.length === 1) {

                                        console.log(`\nResultados encontrados: ${resultadoAdmin.length}`);
                                        // Autenticação bem-sucedida para administrador
                                        res.json({
                                            tipo: 'admin',
                                            id: resultadoAdmin[0].idAdmin,
                                            email: resultadoAdmin[0].email,
                                            nome: resultadoAdmin[0].nome,
                                        });
                                    } else if (resultadoAutenticar.length === 0 || resultadoAdmin.length === 0) {
                                        // Nenhum usuário ou administrador encontrado
                                        res.status(403).send("Email e/ou senha inválido(s)");
                                    } else {
                                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                                    }
                                }
                            ).catch(
                                function (erro) {
                                    console.log(erro);
                                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                                    res.status(500).json(erro.sqlMessage);
                                }
                            );

                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var sexo = req.body.sexoServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var indicadorId = req.body.indicadorServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sexo == undefined) {
        res.status(400).send("Seu sexo está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (indicadorId == undefined) {
        res.status(400).send("Seu indicador está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, sexo, email, senha, indicadorId)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarPorNome(req, res) {
    var nome = req.query.nome;

    usuarioModel.buscarPorNome(nome).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function listar(req, res) {
    usuarioModel.listar().then((resultado) => {
        res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    var id = req.params.id;

    usuarioModel.buscarPorId(id).then((resultado) => {
        res.status(200).json(resultado);
    });
}

module.exports = {
    autenticar,
    cadastrar,
    buscarPorNome,
    buscarPorId,
    listar
}