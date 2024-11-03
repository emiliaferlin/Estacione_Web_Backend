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
        const { id_veiculo, id_vaga, data_entrada, data_saida } = body;

        // Verifica se o veículo existe
        const checkVeiculo = await pool.query(`SELECT 1 FROM veiculo WHERE id = $1`, [id_veiculo]);
        if (checkVeiculo.rowCount === 0) {
            throw `Veículo com o ID ${id_veiculo} não encontrado. Verifique o ID do veículo.`;
        }

        // Verifica se a vaga existe
        const checkVaga = await pool.query(`SELECT 1 FROM vaga WHERE id = $1`, [id_vaga]);
        if (checkVaga.rowCount === 0) {
            throw `Vaga com o ID ${id_vaga} não encontrada. Verifique o ID da vaga.`;
        }

        const results = await pool.query(
            `INSERT INTO registro_estacionamento (id_veiculo, id_vaga, data_entrada, data_saida) 
            VALUES ($1, $2, $3, $4)
            RETURNING id, id_veiculo, id_vaga, data_entrada, data_saida`,
            [id_veiculo, id_vaga, data_entrada, data_saida]
        );

        const historicoEstacionamento = results.rows[0];
        return new HistoricoEstacionamento(
            historicoEstacionamento.id,
            historicoEstacionamento.id_veiculo,
            historicoEstacionamento.id_vaga,
            historicoEstacionamento.data_entrada,
            historicoEstacionamento.data_saida
        );
    } catch (err) {
        throw "Erro ao inserir o registro de estacionamento: " + err;
    }
}



const updateHistoricoEstacionamentoDB = async (body) => {
    try {
        const { id, id_veiculo, id_vaga, data_entrada, data_saida } = body;

        // Verifica se o histórico existe
        const checkHistorico = await pool.query(`SELECT 1 FROM registro_estacionamento WHERE id = $1`, [id]);
        if (checkHistorico.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${id} para ser alterado.`;
        }

        // Verifica se o veículo existe
        const checkVeiculo = await pool.query(`SELECT 1 FROM veiculo WHERE id = $1`, [id_veiculo]);
        if (checkVeiculo.rowCount === 0) {
            throw `Veículo com o ID ${id_veiculo} não encontrado. Verifique o ID do veículo.`;
        }

        // Verifica se a vaga existe
        const checkVaga = await pool.query(`SELECT 1 FROM vaga WHERE id = $1`, [id_vaga]);
        if (checkVaga.rowCount === 0) {
            throw `Vaga com o ID ${id_vaga} não encontrada. Verifique o ID da vaga.`;
        }

        const results = await pool.query(
            `UPDATE registro_estacionamento SET id_veiculo = $2, id_vaga = $3, data_entrada = $4, data_saida = $5 
            WHERE id = $1 
            RETURNING id, id_veiculo, id_vaga, data_entrada, data_saida`,
            [id, id_veiculo, id_vaga, data_entrada, data_saida]
        );

        const historicoEstacionamento = results.rows[0];
        return new HistoricoEstacionamento(
            historicoEstacionamento.id,
            historicoEstacionamento.id_veiculo,
            historicoEstacionamento.id_vaga,
            historicoEstacionamento.data_entrada,
            historicoEstacionamento.data_saida
        );
    } catch (err) {
        throw "Erro ao alterar o registro de estacionamento: " + err;
    }
}


const deleteHistoricoEstacionamentoDB = async (id) => {
    try {
        // Verifica se o registro de estacionamento existe antes de tentar removê-lo
        const checkHistorico = await pool.query(`SELECT 1 FROM registro_estacionamento WHERE id = $1`, [id]);
        if (checkHistorico.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${id} para ser removido.`;
        }

        const results = await pool.query(`DELETE FROM registro_estacionamento WHERE id = $1 RETURNING id`, [id]);

        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${id} para ser removido.`;
        } else {
            return "Registro de estacionamento removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o registro de estacionamento: " + err;
    }
}


const getHistoricoEstacionamentoPorCodigoDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM registro_estacionamento where id = $1`,
            [id]);
        if (results.rowCount == 0) {
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