const { Router } = require('express');

const { getVeiculo, addVeiculo, updateVeiculo, deleteVeiculo, getVeiculoPorCodigo } = require('../controllers/veiculoController');

const rotasVeiculos = new Router();

rotasVeiculos.route('/veiculo')
   .get(getVeiculo)
   .post(addVeiculo)
   .put(updateVeiculo)

rotasVeiculos.route('/veiculo/:codigo')
   .get(getVeiculoPorCodigo)
   .delete(deleteVeiculo)

module.exports = { rotasVeiculos };