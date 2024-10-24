const { Router } = require('express');

const { rotasVeiculos } = require('./rotasVeiculo');
const { rotasVagas } = require('./rotasVaga');
const { rotasHistoricoEstacionamento } = require('./rotasHistoricoEstacionamento');

const rotas = new Router();

rotas.use(rotasVeiculos);
rotas.use(rotasVagas);
rotas.use(rotasHistoricoEstacionamento);

module.exports = rotas;