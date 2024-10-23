const { pool } = require('../config');
const Veiculo = require('../entities/veiculo')

const getVeiculoDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM Veiculo ORDER BY nome');
        return rows.map((veiculo) => new Veiculo(veiculo.codigo, veiculo.nome));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addVeiculoDB = async (body) => {
    try {   
        const { nome } = body; 
        const results = await pool.query(`INSERT INTO Veiculo (nome) 
            VALUES ($1)
            returning codigo, nome`,
        [nome]);
        const veiculo = results.rows[0];
        return new Veiculo(veiculo.codigo, veiculo.nome); 
    } catch (err) {
        throw "Erro ao inserir a Veiculo: " + err;
    }    
}


const updateVeiculoDB = async (body) => {
    try {   
        const { codigo, nome }  = body; 
        const results = await pool.query(`UPDATE Veiculo set nome = $2 where codigo = $1 
        returning codigo, nome`,
        [codigo, nome]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const veiculo = results.rows[0];
        return new Veiculo(veiculo.codigo, veiculo.nome); 
    } catch (err) {
        throw "Erro ao alterar a Veiculo: " + err;
    }      
}

const deleteVeiculoDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM Veiculo where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Veiculo removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a Veiculo: " + err;
    }     
}

const getVeiculoPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM Veiculo where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const veiculo = results.rows[0];
            return new Veiculo(veiculo.codigo, veiculo.nome); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a Veiculo: " + err;
    }     
}

module.exports = {
    getVeiculoDB, addVeiculoDB, updateVeiculoDB, deleteVeiculoDB, getVeiculoPorCodigoDB
}