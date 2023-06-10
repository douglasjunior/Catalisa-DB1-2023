const dateFns = require('date-fns');

const dataAtual = new Date();

const dataFormatada = dateFns.format(dataAtual, 'dd/MM/yyyy HH:mm:ss');

console.log(dataFormatada);
