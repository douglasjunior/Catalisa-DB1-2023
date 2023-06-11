const express = require('express');

const porta = 3000;

const server = express();

server.use('/', (request, response) => {
  response.setHeader('content-type', 'text/html; charset=utf-8');

  response.status(200);

  response.send('Olá Node JS!');
});

server.listen(porta, () => {

  console.log('Servidor iniciado na porta:', porta);

});
