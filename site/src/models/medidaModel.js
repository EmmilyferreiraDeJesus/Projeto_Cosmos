var database = require("../database/config");

function buscarUltimasMedidas(limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ` 
        SELECT
        (SELECT COUNT(*) FROM usuario WHERE sexo = 'Masculino') as masculino,
        (SELECT COUNT(*) FROM usuario WHERE sexo = 'Feminino') as feminino,
        (SELECT COUNT(*) FROM usuario WHERE sexo NOT IN ('Masculino', 'Feminino')) as outros, 
        (SELECT COUNT(*) FROM usuario WHERE fkIndicador is null) as usuarios_nao_indicados,
        (SELECT COUNT(*) FROM usuario WHERE fkIndicador is not null) as usuarios_indicados,
        LIMIT ${limite_linhas};`;
        

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` 
        SELECT
        (SELECT COUNT(*) FROM usuario WHERE sexo = 'Masculino') as masculino,
        (SELECT COUNT(*) FROM usuario WHERE sexo = 'Feminino') as feminino,
        (SELECT COUNT(*) FROM usuario WHERE sexo NOT IN ('Masculino', 'Feminino')) as outros,
        (SELECT COUNT(*) FROM usuario WHERE fkIndicador is null) as usuarios_nao_indicados,
        (SELECT COUNT(*) FROM usuario WHERE fkIndicador is not null) as usuarios_indicados
        LIMIT ${limite_linhas};`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
}
