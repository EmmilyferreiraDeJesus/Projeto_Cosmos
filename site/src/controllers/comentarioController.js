var comentarioModel = require("../models/comentarioModel");

function listar(req, res) {
    var idPost = req.params.idPost;

    comentarioModel.listar(idPost).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os comentários: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function publicar(req, res) {
    var descricao = req.body.descricao;
    var idUsuario = req.params.idUsuario;
    var idPost = req.params.idPost;

    if (descricao == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idPost == undefined) {
        res.status(403).send("O iPost do usuário está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        comentarioModel.publicar(descricao, idUsuario, idPost)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function curtir(req, res) {
    var idUsuario = req.params.idUsuario;
    var idPost = req.params.idPost;

    if (idUsuario == undefined) {
        res.status(400).send("O idPost está indefinido!");
    } else if (idPost == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        comentarioModel.curtir(idUsuario, idPost)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a curtida: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function verificarCurtida(req, res) {
    var idUsuario = req.params.idUsuario;
    var idPost = req.params.idPost;

    comentarioModel.verificarCurtida(idUsuario, idPost)
        .then(function (resultado) {
            console.log('Resultado da verificação de curtida:', resultado);
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.error('Erro ao verificar curtida no controller:', erro);
            res.status(500).json({ erro: 'Erro interno ao verificar curtida' });
        });
}

function contarCurtidas(req, res) {
    var idPost = req.params.idPost;

    comentarioModel.contarCurtidas(idPost)
        .then(function (resultado) {
            res.status(200).json({ numeroCurtidas: resultado[0].numeroCurtidas });
        })
        .catch(function (erro) {
            console.error(erro);
            res.status(500).json(erro);
        });
}

module.exports = {
    listar,
    publicar,
    curtir,
    verificarCurtida,
    contarCurtidas
}