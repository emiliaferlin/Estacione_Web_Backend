class HistoricoEstacionamento {
    constructor(id, id_veiculo, id_vaga, data_entrada, data_saida) {
        this.id = id;
        this.id_veiculo = id_veiculo;
        this.id_vaga = id_vaga;
        this.data_entrada = data_entrada;
        this.data_saida = data_saida;
    }
}

module.exports = HistoricoEstacionamento;