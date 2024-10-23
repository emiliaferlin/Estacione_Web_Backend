const { pool } = require('../config');
const HistoricoEstacionamento = require('../entities/historicoEstacionamento')

const getHistoricoEstacionamentoDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM HistoricoEstacionamento ORDER BY nome');
        return rows.map((historicoEstacionamento) => new HistoricoEstacionamento(historicoEstacionamento.codigo, historicoEstacionamento.nome));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addHistoricoEstacionamentoDB = async (body) => {
    try {   
        const { nome } = body; 
        const results = await pool.query(`INSERT INTO HistoricoEstacionamento (nome) 
            VALUES ($1)
            returning codigo, nome`,
        [nome]);
        const historicoEstacionamento = results.rows[0];
        return new HistoricoEstacionamento(historicoEstacionamento.codigo, historicoEstacionamento.nome); 
    } catch (err) {
        throw "Erro ao inserir a HistoricoEstacionamento: " + err;
    }    
}


const updateHistoricoEstacionamentoDB = async (body) => {
    try {   
        const { codigo, nome }  = body; 
        const results = await pool.query(`UPDATE HistoricoEstacionamento set nome = $2 where codigo = $1 
        returning codigo, nome`,
        [codigo, nome]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const historicoEstacionamento = results.rows[0];
        return new HistoricoEstacionamento(historicoEstacionamento.codigo, historicoEstacionamento.nome); 
    } catch (err) {
        throw "Erro ao alterar a HistoricoEstacionamento: " + err;
    }      
}

const deleteHistoricoEstacionamentoDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM HistoricoEstacionamento where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "HistoricoEstacionamento removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a HistoricoEstacionamento: " + err;
    }     
}

const getHistoricoEstacionamentoPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM HistoricoEstacionamento where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const historicoEstacionamento = results.rows[0];
            return new HistoricoEstacionamento(historicoEstacionamento.codigo, historicoEstacionamento.nome); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a HistoricoEstacionamento: " + err;
    }     
}

module.exports = {
    getHistoricoEstacionamentoDB, addHistoricoEstacionamentoDB, updateHistoricoEstacionamentoDB, deleteHistoricoEstacionamentoDB, getHistoricoEstacionamentoPorCodigoDB
}