const { Router } = require('express');

const { rotasVeiculos } = require('./rotasVeiculo');
const { rotasVagas } = require('./rotasVaga');
const { rotasHistoricoEstacionamento } = require('./rotasHistoricoEstacionamento');
const { login } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.use(rotasVeiculos);
rotas.use(rotasVagas);
rotas.use(rotasHistoricoEstacionamento);

// rota para fazer o login e pegar o JWT
rotas.route("/login").post(login)

module.exports = rotas;