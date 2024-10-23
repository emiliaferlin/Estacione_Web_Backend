
const { getVeiculoDB, addVeiculoDB, updateVeiculoDB, deleteVeiculoDB, getVeiculoPorCodigoDB } = require('../usecases/veiculoUseCases')

const getVeiculo = async (request, response) => {
    await getVeiculoDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as Veiculo: ' + err
        }));
}

const addVeiculo = async (request, response) => {
    await addVeiculoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Veiculo criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateVeiculo = async (request, response) => {
    await updateVeiculoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Veiculo alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteVeiculo = async (request, response) => {
    await deleteVeiculoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getVeiculoPorCodigo= async (request, response) => {
    await getVeiculoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getVeiculo, addVeiculo, updateVeiculo, deleteVeiculo, getVeiculoPorCodigo
}
