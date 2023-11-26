var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController.js");

router.get("/listar", function (req, res) {
    comentarioController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    comentarioController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    comentarioController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario/:idPost", function (req, res) {
    comentarioController.publicar(req, res);
});

module.exports = router;