var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController.js");

router.get("/listar/:idPost", function (req, res) {
    
    comentarioController.listar(req, res);
});

router.post("/publicar/:idUsuario/:idPost", function (req, res) {
    comentarioController.publicar(req, res);
});

module.exports = router;