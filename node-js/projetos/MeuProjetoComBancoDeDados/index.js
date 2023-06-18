const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', user: 'root',
  password: 'root', database: 'exemplo'
});

connection.query(
  'SELECT * FROM `usuarios` WHERE `nome` = "Douglas" AND `idade` > 20',
  function (err, results, fields) {
    if (err) {
      console.error(err);
      return;
    }
    
    console.log(results); // resultado contendo as linhas da consulta
    console.log(fields); // campos contendo metadados sobre os resultados  
  }
);
