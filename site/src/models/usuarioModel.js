var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT idUsuario, nome, sexo, email, fkIndicador as indicadorId FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticarAdm(email, senha) {
  var query = `SELECT idAdministrador, nome, email FROM administrador WHERE email = '${email}' AND senha = '${senha}';`;
  return database.executar(query);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, sexo, email, senha, indicadorId) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sexo, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, sexo, email, senha, fkIndicador) VALUES ('${nome}', '${sexo}', '${email}', '${senha}', ${indicadorId});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarPorId(id) {
    var query = `select * from usuario where idUsuario = '${id}'`;
  
    return database.executar(query);
  }
  
  function listar() {
    var query = `select idUsuario, nome from usuario where idUsuario not in (select distinct fkIndicador from usuario where fkIndicador is not null)`;
  
    return database.executar(query);
  }
  
  function buscarPorNome(nome) {
    var query = `select * from usuarios where nome = '${nome}'`;
  
    return database.executar(query);
  }

module.exports = {
    autenticar,
    autenticarAdm,
    cadastrar,
    buscarPorNome,
    buscarPorId,
    listar
}