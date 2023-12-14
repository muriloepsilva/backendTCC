const PagSeguro = require("pagseguro-api");

export default class PaymentService {
  async pagarCartao({ nome, mes, ano, cvv, numero, valorFinal }) {
    const pag = await PagSeguro();

    pag.referencia = "BRL0123";
    pag.Descricao("Cobrança por Cartão");
    pag.Parcelas(1);
    pag.Cartão({
      numero,
      mes,
      ano,
      cvv,
      nome,
    });

    const cents = valorFinal * 100;
    const cobranca = await pag.Cobrar(cents);
  }
}
