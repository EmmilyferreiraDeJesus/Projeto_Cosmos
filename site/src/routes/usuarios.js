var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioControllers");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/buscar", function (req, res) {
    usuarioController.buscarPorNome(req, res);
});

router.get("/buscar/:id", function (req, res) {
 usuarioController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
 usuarioController.listar(req, res);
});

module.exports = router;