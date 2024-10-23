const { Router } = require('express');

const { getVaga, addVaga, updateVaga, deleteVaga, getVagaPorCodigo } = require('../controllers/vagaController');

const rotasVagas = new Router();

rotasVagas.route('/vaga')
   .get(getVaga)
   .post(addVaga)
   .put(updateVaga)

rotasVagas.route('/vaga/:codigo')
   .get(getVagaPorCodigo)
   .delete(deleteVaga)

module.exports = { rotasVagas };