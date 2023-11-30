var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController.js");

router.get("/listar/:idPost", function (req, res) {
    
    comentarioController.listar(req, res);
});

router.get("/contarCurtidas/:idPost", function (req, res) {
    comentarioController.contarCurtidas(req, res);
});

router.get("/verificarCurtida/:idUsuario/:idPost", function (req, res) {
    comentarioController.verificarCurtida(req, res);
});

router.post("/publicar/:idUsuario/:idPost", function (req, res) {
    comentarioController.publicar(req, res);
});

router.post("/curtir/:idUsuario/:idPost", function (req, res) {
    comentarioController.curtir(req, res);
});

module.exports = router;