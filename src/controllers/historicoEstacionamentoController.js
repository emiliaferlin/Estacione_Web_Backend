
const { getHistoricoEstacionamentoDB, addHistoricoEstacionamentoDB, updateHistoricoEstacionamentoDB, deleteHistoricoEstacionamentoDB, getHistoricoEstacionamentoPorCodigoDB } = require('../usecases/historicoEstacionamentoUseCases')

const getHistoricoEstacionamento = async (request, response) => {
    await getHistoricoEstacionamentoDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as HistoricoEstacionamento: ' + err
        }));
}

const addHistoricoEstacionamento = async (request, response) => {
    await addHistoricoEstacionamentoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "HistoricoEstacionamento criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateHistoricoEstacionamento = async (request, response) => {
    await updateHistoricoEstacionamentoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "HistoricoEstacionamento alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteHistoricoEstacionamento = async (request, response) => {
    await deleteHistoricoEstacionamentoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getHistoricoEstacionamentoPorCodigo= async (request, response) => {
    await getHistoricoEstacionamentoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getHistoricoEstacionamento, addHistoricoEstacionamento, updateHistoricoEstacionamento, deleteHistoricoEstacionamento, getHistoricoEstacionamentoPorCodigo
}
