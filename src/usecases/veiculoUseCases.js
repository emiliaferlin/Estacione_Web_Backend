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
        const { id, placa, modelo, cor } = body;
        const results = await pool.query(
            `INSERT INTO veiculo (id, placa, modelo, cor) 
            VALUES ($1, $2, $3, $4)
            RETURNING id, placa, modelo, cor`,
            [id, placa, modelo, cor]
        );
        const veiculo = results.rows[0];
        return new Veiculo(veiculo.id, veiculo.placa, veiculo.modelo, veiculo.cor);
    } catch (err) {
        throw "Erro ao inserir o Veículo: " + err;
    }
}



const updateVeiculoDB = async (body) => {
    try {
        const { id, placa, modelo, cor } = body;
        const results = await pool.query(
            `UPDATE veiculo SET placa = $2, modelo = $3, cor = $4 WHERE id = $1 
            RETURNING id, placa, modelo, cor`,
            [id, placa, modelo, cor]
        );
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
        }
        const veiculo = results.rows[0];
        return new Veiculo(veiculo.id, veiculo.placa, veiculo.modelo, veiculo.cor);
    } catch (err) {
        throw "Erro ao alterar o Veículo: " + err;
    }
}


const deleteVeiculoDB = async (id) => {
    try {
        // Remove a referência ao veículo em outras tabelas (ajustando o nome do campo conforme necessário)
        await pool.query(`UPDATE registro_estacionamento SET id_veiculo = NULL WHERE id_veiculo = $1`, [id]);

        const results = await pool.query(`DELETE FROM veiculo WHERE id = $1 RETURNING id`, [id]);

        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${id} para ser removido`;
        } else {
            return "Veículo removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o Veículo: " + err;
    }
}


const getVeiculoPorCodigoDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM veiculo where id = $1`,
            [id]);
        if (results.rowCount == 0) {
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