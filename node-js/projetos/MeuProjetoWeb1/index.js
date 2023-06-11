const http = require('http');

const porta = 3000;

const server = http.createServer((request, response) => {
  response.setHeader('content-type', 'text/html; charset=utf-8');

  response.writeHead(200);

  response.write('Olá Node JS!');

  response.end();
});

server.listen(porta, () => {

  console.log('Servidor iniciado na porta:', porta);

});
