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
categoria VARCHAR(45),
CONSTRAINT chkcategoria CHECK (categoria IN('Observação Celestial', 'Exploração Espacial', 'Ciência Astronômica')),
fkAdministrador INT,
CONSTRAINT fkAdministrador FOREIGN KEY (fkAdministrador)
	REFERENCES administrador (idAdministrador)
);

insert into post values
	(null,'Os melhores livros de astronomia para iniciantes', 'Observação Celestial', 1),
    (null,'Buracos negros podem fornecer energia', 'Exploração Espacial', 1),
    (null,'O que é e como se forma a poeira cósmica?', 'Ciência Astronômica', 1),
    (null,'Nasa planeja teste de mineração na Lua na próxima década', 'Exploração Espacial', 1),
    (null,'A Seleção Natural Cosmológica de Lee Smolin', 'Ciência Astronômica', 1),
    (null,'Lua se encontra com Júpiter após eclipse', 'Observação Celestial', 1);

CREATE TABLE comentario (
idComentario INT AUTO_INCREMENT,
descricao VARCHAR(300) NOT  NULL,
fkUsuario INT,
CONSTRAINT fkUsuario FOREIGN KEY (fkUsuario)
	REFERENCES usuario (idUsuario),
fkPost INT,
CONSTRAINT fkPost FOREIGN KEY (fkPost)
	REFERENCES post (idPost),
imagem VARCHAR(30),
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

truncate table usuario;
truncate table administrador;
truncate table post;
truncate table comentario;
truncate table curtida;