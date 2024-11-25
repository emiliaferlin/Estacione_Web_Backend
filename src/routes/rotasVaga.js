const { Router } = require('express');
const { verificaJWT } = require('../controllers/segurancaController')

const { getVaga, addVaga, updateVaga, deleteVaga, getVagaPorCodigo } = require('../controllers/vagaController');

const rotasVagas = new Router();

rotasVagas.route('/vaga')
   .get(verificaJWT, getVaga)
   .post(verificaJWT, addVaga)
   .put(verificaJWT, updateVaga)

rotasVagas.route('/vaga/:codigo')
   .get(verificaJWT, getVagaPorCodigo)
   .delete(verificaJWT, deleteVaga)

module.exports = { rotasVagas };