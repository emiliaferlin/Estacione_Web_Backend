const { Router } = require('express');

const { getVeiculo, addVeiculo, updateVeiculo, deleteVeiculo, getVeiculoPorCodigo } = require('../controllers/veiculoController');
const { verificaJWT } = require('../controllers/segurancaController')

const rotasVeiculos = new Router();

rotasVeiculos.route('/veiculo')
   .get(verificaJWT, getVeiculo)
   .post(verificaJWT, addVeiculo)
   .put(verificaJWT, updateVeiculo)

rotasVeiculos.route('/veiculo/:codigo')
   .get(verificaJWT, getVeiculoPorCodigo)
   .delete(verificaJWT, deleteVeiculo)

module.exports = { rotasVeiculos };