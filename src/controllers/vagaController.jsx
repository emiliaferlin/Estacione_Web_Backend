
const { getVagaDB, addVagaDB, updateVagaDB, deleteVagaDB, getVagaPorCodigoDB } = require('../usecases/vagaUseCases')

const getVaga = async (request, response) => {
    await getVagaDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as Vaga: ' + err
        }));
}

const addVaga = async (request, response) => {
    await addVagaDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Vaga criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateVaga = async (request, response) => {
    await updateVagaDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Vaga alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteVaga = async (request, response) => {
    await deleteVagaDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getVagaPorCodigo= async (request, response) => {
    await getVagaPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getVaga, addVaga, updateVaga, deleteVaga, getVagaPorCodigo
}
