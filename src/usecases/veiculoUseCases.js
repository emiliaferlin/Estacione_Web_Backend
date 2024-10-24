const { pool } = require('../config');
const Veiculo = require('../entities/veiculo')

const getVeiculoDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM veiculo ORDER BY placa');
        return rows.map((veiculo) => new Veiculo(veiculo.id, veiculo.placa, veiculo.modelo, veiculo.cor));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addVeiculoDB = async (body) => {
    try {   
        const { placa } = body; 
        const results = await pool.query(`INSERT INTO veiculo (placa) 
            VALUES ($1)
            returning id, placa, modelo, cor`,
        [placa]);
        const veiculo = results.rows[0];
        return new Veiculo(veiculo.id, veiculo.placa, veiculo.modelo, veiculo.cor); 
    } catch (err) {
        throw "Erro ao inserir a Veiculo: " + err;
    }    
}


const updateVeiculoDB = async (body) => {
    try {   
        const { id, placa }  = body; 
        const results = await pool.query(`UPDATE veiculo set placa = $2 where id = $1 
        returning id, placa, modelo, cor`,
        [id, placa]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
        }
        const veiculo = results.rows[0];
        return new Veiculo(veiculo.id, veiculo.placa, veiculo.modelo, veiculo.cor); 
    } catch (err) {
        throw "Erro ao alterar a Veiculo: " + err;
    }      
}

const deleteVeiculoDB = async (id) => {
    try {           
        const results = await pool.query(`DELETE FROM veiculo where id = $1`,
        [id]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser removido`;
        } else {
            return "Veiculo removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a Veiculo: " + err;
    }     
}

const getVeiculoPorCodigoDB = async (id) => {
    try {           
        const results = await pool.query(`SELECT * FROM veiculo where id = $1`,
        [id]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + id;
        } else {
            const veiculo = results.rows[0];
            return new Veiculo(veiculo.id, veiculo.placa, veiculo.modelo, veiculo.cor); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a Veiculo: " + err;
    }     
}

module.exports = {
    getVeiculoDB, addVeiculoDB, updateVeiculoDB, deleteVeiculoDB, getVeiculoPorCodigoDB
}