var database = require("../database/config");

var galaxias = [
    "../assets/galaxia0.jpeg",
    "../assets/galaxia1.jpeg",
    "../assets/galaxia2.jpeg",
    "../assets/galaxia3.jpeg",
    "../assets/galaxia4.jpeg"
];

function listar(idPost) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT 
            c.descricao,
            c.fkUsuario,
            c.fkPost,
            c.imagem,
            u.idUsuario AS idUsuario,
            u.nome,
            u.email,
            u.senha,
            p.idPost AS idPost,
            p.titulo
        FROM comentario c
            INNER JOIN usuario u
                ON c.fkUsuario = u.idUsuario
            JOIN post p
                ON c.fkPost = p.idPost
        WHERE c.fkPost = ${idPost};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function publicar(descricao, idUsuario, idPost) {
    var max = 4;
    var min = 1;
    var intervalo = max - min;

    var aleatorio = Math.floor(Math.random() * intervalo) + min;
    console.log(aleatorio);
    var imagem = galaxias[aleatorio - min];

    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", descricao, idUsuario, idPost, imagem);
    var instrucao = `
        INSERT INTO comentario (descricao, fkUsuario, fkPost, imagem) VALUES ('${descricao}', ${idUsuario}, ${idPost}, '${imagem}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    publicar
}