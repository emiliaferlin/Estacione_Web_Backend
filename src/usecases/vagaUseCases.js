const { pool } = require('../config');
const Vaga = require('../entities/vaga')

const getVagaDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM vaga ORDER BY numero_vaga');
        return rows.map((vaga) => new Vaga(vaga.id, vaga.numero_vaga, vaga.ocupada));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addVagaDB = async (body) => {
    try {   
        const { numero_vaga } = body; 
        const results = await pool.query(`INSERT INTO vaga (numero_vaga) 
            VALUES ($1)
            returning id, numero_vaga, ocupada`,
        [numero_vaga]);
        const vaga = results.rows[0];
        return new Vaga(vaga.id, vaga.numero_vaga, vaga.ocupada); 
    } catch (err) {
        throw "Erro ao inserir a vaga: " + err;
    }    
}


const updateVagaDB = async (body) => {
    try {   
        const { id, numero_vaga, ocupada }  = body; 
        const results = await pool.query(`UPDATE vaga set numero_vaga = $2 where id = $1 
        returning id, numero_vaga, ocupada`,
        [id, numero_vaga, ocupada]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
        }
        const vaga = results.rows[0];
        return new Vaga(vaga.id, vaga.numero_vaga, vaga.ocupada); 
    } catch (err) {
        throw "Erro ao alterar a vaga: " + err;
    }      
}

const deleteVagaDB = async (id) => {
    try {           
        const results = await pool.query(`DELETE FROM vaga where id = $1`,
        [id]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser removido`;
        } else {
            return "Vaga removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a Vaga: " + err;
    }     
}

const getVagaPorCodigoDB = async (id) => {
    try {           
        const results = await pool.query(`SELECT * FROM vaga where id = $1`,
        [id]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + id;
        } else {
            const vaga = results.rows[0];
            return new Vaga(vaga.id, vaga.numero_vaga, vaga.ocupada); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a Vaga: " + err;
    }     
}

module.exports = {
    getVagaDB, addVagaDB, updateVagaDB, deleteVagaDB, getVagaPorCodigoDB
}