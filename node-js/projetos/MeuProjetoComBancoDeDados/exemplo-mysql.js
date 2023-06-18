const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'exemplo'
});

/*

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `idade` int DEFAULT NULL,
  `data_criacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

*/

const query = 'SELECT * FROM `usuarios` WHERE `nome` = ? AND `idade` > ?';
const parametros = ['Douglas', 20];

connection.query(
  query,
  parametros,
  function (err, results, fields) {
    if (err) {
      console.error(err);
      return;
    }

    console.log(results); // resultado contendo as linhas da consulta
    console.log(fields); // campos contendo metadados sobre os resultados   
  }
);
