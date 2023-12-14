import { Request, Response } from "express";
import { catchError } from "../../../infra/functions";
import PaymentService from "../service/paymentService";

export default class PaymentController {
  async pagarCartao(req: Request, res: Response) {
    const { nome, mes, ano, cvv, numero, valorFinal } = req.body;
    const service = new PaymentService();

    try {
      const data = await service.pagarCartao({
        nome,
        mes,
        ano,
        cvv,
        numero,
        valorFinal,
      });

      return res.status(200).send(data);
    } catch (err) {
      return catchError(res, err);
    }
  }
}
