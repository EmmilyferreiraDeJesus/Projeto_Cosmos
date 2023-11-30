CREATE DATABASE Cosmos;

DROP DATABASE Cosmos;

USE Cosmos;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(25) NOT  NULL,
sexo VARCHAR(10) NOT NULL,
CONSTRAINT chkSexo CHECK (sexo IN('Feminino', 'Masculino', 'Outro')),
email VARCHAR(100) NOT NULL,
senha VARCHAR(16) NOT NULL,
fkIndicador INT,
CONSTRAINT fkIndicador FOREIGN KEY (fkIndicador)
	REFERENCES usuario (idUsuario)
);

CREATE TABLE administrador (
idAdministrador INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(25) NOT  NULL,
email VARCHAR(100) NOT NULL,
senha VARCHAR(16) NOT NULL
);

INSERT INTO administrador VALUES (null, 'Emmily',  'emmilyferreiraf946@gmail.com', '74859696');

CREATE TABLE post (
idPost INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(100) NOT NULL,
curtidas INT,
fkAdministrador INT,
CONSTRAINT fkAdministrador FOREIGN KEY (fkAdministrador)
	REFERENCES administrador (idAdministrador)
);

CREATE TABLE comentario (
idComentario INT AUTO_INCREMENT,
descricao VARCHAR(300) NOT  NULL,
fkUsuario INT,
CONSTRAINT fkUsuario FOREIGN KEY (fkUsuario)
	REFERENCES usuario (idUsuario),
fkPost INT,
CONSTRAINT fkPost FOREIGN KEY (fkPost)
	REFERENCES post (idPost),
PRIMARY KEY (idComentario, fkUsuario, fkPost)
);

CREATE TABLE curtida (
fkUsuario INT,
CONSTRAINT fkUsuario_curtida FOREIGN KEY (fkUsuario)
	REFERENCES usuario (idUsuario),
fkPost INT,
CONSTRAINT fkPost_curtida FOREIGN KEY (fkPost)
	REFERENCES post (idPost),
PRIMARY KEY (fkUsuario, fkPost)
);

SELECT * FROM usuario;
SELECT * FROM administrador;
SELECT * FROM post;
SELECT * FROM comentario;
SELECT * FROM curtida;

truncate table curtida;
truncate table comentario;

SELECT idUsuario, nome FROM usuario
        WHERE idUsuario NOT IN 
        (SELECT DISTINCT fkIndicador FROM usuario WHERE fkIndicador IS NOT NULL);