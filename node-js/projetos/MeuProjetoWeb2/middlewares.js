const express = require('express');

const server = express();

const porta = 3000;

server.use((request, response, next) => {
  const token = request.headers.token;

  if (token == 'meu-token') {

    next();

  } else {

    response.status(403).send();

  }
});


server.get('/usuarios/:usuarioId/', (request, response) => {

  const usuarioId = request.params.usuarioId;

  response.status(200);

  response.send("Listando usuários: " + usuarioId);

});


server.post('/usuarios/', (request, response) => {

  const usuario = request.body;

  console.log('Usuários recebido:', usuario);

  response.status(201).send();

});


server.listen(porta, () => {

  console.log('Servidor iniciado na porta:', porta);

});
