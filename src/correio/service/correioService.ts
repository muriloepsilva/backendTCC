const Correios = require("node-correios");

export default class CorreioService {
  async searchCep({ cep }) {
    const correios = new Correios();

    return correios.consultaCEP({ cep });
  }

  async calcularFrete({ cep }) {
    const correios = new Correios();

    const args = {
      nCdServico: "nCdServico",
      sCepOrigem: "CEP",
      sCepDestino: cep,
      nVlPeso: 1,
      nCdFormato: 1,
      nVlComprimento: 25,
      nVlAltura: 14,
      nVlLargura: 15,
      nVlDiametro: 0,
    };

    const valor = await correios.calcPreco(args);

    return valor[0];
  }
}
