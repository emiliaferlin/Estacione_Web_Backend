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
        const { id, numero_vaga, ocupada } = body;
        const results = await pool.query(
            `INSERT INTO vaga (id, numero_vaga, ocupada) 
            VALUES ($1, $2, $3)
            returning id, numero_vaga, ocupada`,
            [id, numero_vaga, ocupada]
        );
        const vaga = results.rows[0];
        return new Vaga(vaga.id, vaga.numero_vaga, vaga.ocupada);
    } catch (err) {
        throw "Erro ao inserir a vaga: " + err;
    }
}


const updateVagaDB = async (body) => {
    try {
        const { id, numero_vaga, ocupada } = body;
        const results = await pool.query(
            `UPDATE vaga SET numero_vaga = $2, ocupada = $3 WHERE id = $1 
            RETURNING id, numero_vaga, ocupada`,
            [id, numero_vaga, ocupada]
        );
        if (results.rowCount === 0) {
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
        // Remove a referência à vaga nos registros de estacionamento
        await pool.query(`UPDATE registro_estacionamento SET id_vaga = NULL WHERE id_vaga = $1`, [id]);

        const results = await pool.query(`DELETE FROM vaga WHERE id = $1 RETURNING id`, [id]);

        if (results.rowCount === 0) {
            throw `Nenhuma vaga encontrada com o código ${id} para ser excluída`;
        }

        return `Vaga ${id} removida com sucesso`;
    } catch (err) {
        throw "Erro ao remover a vaga: " + err;
    }
}



const getVagaPorCodigoDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM vaga where id = $1`,
            [id]);
        if (results.rowCount == 0) {
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