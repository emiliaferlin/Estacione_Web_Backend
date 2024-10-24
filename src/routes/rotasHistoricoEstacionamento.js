const { Router } = require('express');

const { getHistoricoEstacionamento, addHistoricoEstacionamento, updateHistoricoEstacionamento, deleteHistoricoEstacionamento, getHistoricoEstacionamentoPorCodigo } = require('../controllers/historicoEstacionamentoController');

const rotasHistoricoEstacionamento = new Router();

rotasHistoricoEstacionamento.route('/historicoEstacionamento')
   .get(getHistoricoEstacionamento)
   .post(addHistoricoEstacionamento)
   .put(updateHistoricoEstacionamento)

rotasHistoricoEstacionamento.route('/historicoEstacionamento/:codigo')
   .get(getHistoricoEstacionamentoPorCodigo)
   .delete(deleteHistoricoEstacionamento)

module.exports = { rotasHistoricoEstacionamento };