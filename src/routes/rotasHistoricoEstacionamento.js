const { Router } = require('express');

const { getHistoricoEstacionamento, addHistoricoEstacionamento, updateHistoricoEstacionamento, deleteHistoricoEstacionamento, getHistoricoEstacionamentoPorCodigo } = require('../controllers/historicoEstacionamentoController');
const { verificaJWT } = require('../controllers/segurancaController')

const rotasHistoricoEstacionamento = new Router();

rotasHistoricoEstacionamento.route('/historicoEstacionamento')
   .get(verificaJWT, getHistoricoEstacionamento)
   .post(verificaJWT, addHistoricoEstacionamento)
   .put(verificaJWT, updateHistoricoEstacionamento)

rotasHistoricoEstacionamento.route('/historicoEstacionamento/:codigo')
   .get(verificaJWT, getHistoricoEstacionamentoPorCodigo)
   .delete(verificaJWT, deleteHistoricoEstacionamento)

module.exports = { rotasHistoricoEstacionamento };