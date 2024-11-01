const { pool } = require('../config');
const HistoricoEstacionamento = require('../entities/historicoEstacionamento')

const getHistoricoEstacionamentoDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM registro_estacionamento ORDER BY id');
        return rows.map((historicoEstacionamento) => new HistoricoEstacionamento(historicoEstacionamento.id, historicoEstacionamento.id_veiculo, historicoEstacionamento.id_vaga, historicoEstacionamento.data_entrada, historicoEstacionamento.data_saida));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addHistoricoEstacionamentoDB = async (body) => {
    try {   
        const { id, id_veiculo, id_vaga, data_entrada, data_saida } = body; 
        const results = await pool.query(`INSERT INTO registro_estacionamento (data_entrada) 
            VALUES ($1)
            returning id, id_veiculo, id_vaga, data_entrada, data_saida`,
        [id, id_veiculo, id_vaga, data_entrada, data_saida]);
        const historicoEstacionamento = results.rows[0];
        return new HistoricoEstacionamento(historicoEstacionamento.id, historicoEstacionamento.id_veiculo, historicoEstacionamento.id_vaga, historicoEstacionamento.data_entrada, historicoEstacionamento.data_saida); 
    } catch (err) {
        throw "Erro ao inserir a registro_estacionamento: " + err;
    }    
}


const updateHistoricoEstacionamentoDB = async (body) => {
    try {   
        const { id, id_veiculo, id_vaga, data_entrada, data_saida }  = body; 
        const results = await pool.query(`UPDATE registro_estacionamento set data_entrada = $2 where id = $1 
        returning id, id_veiculo, id_vaga, data_entrada, data_saida`,
        [id, id_veiculo, id_vaga, data_entrada, data_saida]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
        }
        const historicoEstacionamento = results.rows[0];
        return new HistoricoEstacionamento(historicoEstacionamento.id, historicoEstacionamento.id_veiculo, historicoEstacionamento.id_vaga, historicoEstacionamento.data_entrada, historicoEstacionamento.data_saida); 
    } catch (err) {
        throw "Erro ao alterar a registro_estacionamento: " + err;
    }      
}

const deleteHistoricoEstacionamentoDB = async (id) => {
    try {           
        const results = await pool.query(`DELETE FROM registro_estacionamento where id = $1`,
        [id]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser removido`;
        } else {
            return "registro_estacionamento removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a registro_estacionamento: " + err;
    }     
}

const getHistoricoEstacionamentoPorCodigoDB = async (id) => {
    try {           
        const results = await pool.query(`SELECT * FROM registro_estacionamento where id = $1`,
        [id]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + id;
        } else {
            const historicoEstacionamento = results.rows[0];
            return new HistoricoEstacionamento(historicoEstacionamento.id, historicoEstacionamento.id_veiculo, historicoEstacionamento.id_vaga, historicoEstacionamento.data_entrada, historicoEstacionamento.data_saida); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a registro_estacionamento: " + err;
    }     
}

module.exports = {
    getHistoricoEstacionamentoDB, addHistoricoEstacionamentoDB, updateHistoricoEstacionamentoDB, deleteHistoricoEstacionamentoDB, getHistoricoEstacionamentoPorCodigoDB
}