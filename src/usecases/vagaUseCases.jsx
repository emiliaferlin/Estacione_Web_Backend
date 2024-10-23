const { pool } = require('../config');
const Vaga = require('../entities/vaga')

const getVagaDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM Vaga ORDER BY nome');
        return rows.map((vaga) => new Vaga(vaga.codigo, vaga.nome));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addVagaDB = async (body) => {
    try {   
        const { nome } = body; 
        const results = await pool.query(`INSERT INTO Vaga (nome) 
            VALUES ($1)
            returning codigo, nome`,
        [nome]);
        const vaga = results.rows[0];
        return new Vaga(vaga.codigo, vaga.nome); 
    } catch (err) {
        throw "Erro ao inserir a vaga: " + err;
    }    
}


const updateVagaDB = async (body) => {
    try {   
        const { codigo, nome }  = body; 
        const results = await pool.query(`UPDATE Vaga set nome = $2 where codigo = $1 
        returning codigo, nome`,
        [codigo, nome]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const vaga = results.rows[0];
        return new Vaga(vaga.codigo, vaga.nome); 
    } catch (err) {
        throw "Erro ao alterar a vaga: " + err;
    }      
}

const deleteVagaDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM Vaga where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Vaga removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a Vaga: " + err;
    }     
}

const getVagaPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM Vaga where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const vaga = results.rows[0];
            return new Vaga(vaga.codigo, vaga.nome); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a Vaga: " + err;
    }     
}

module.exports = {
    getVagaDB, addVagaDB, updateVagaDB, deleteVagaDB, getVagaPorCodigoDB
}