const jwt = require("jsonwebtoken");

const secret = "minha-senha-super-secreta";

const payload = {
  usuario: {
    id: 1,
    nome: 'Douglas',
  },
  tipo: 'administrador',
};

const token = jwt.sign(payload, secret);

console.log('Meu Token: ', token);
