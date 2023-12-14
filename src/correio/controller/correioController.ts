import { Request, Response } from "express";
import { catchError } from "../../../infra/functions";
import CorreioService from "../service/correioService";

export default class CorreioController {
  async searchCep(req: Request, res: Response) {
    const { cep } = req.body;
    const service = new CorreioService();

    try {
      const data = await service.searchCep({ cep });

      return res.status(200).send(data);
    } catch (err) {
      return catchError(res, err);
    }
  }

  async calcularFrete(req: Request, res: Response) {
    const { cep } = req.body;
    const service = new CorreioService();

    try {
      const data = await service.calcularFrete({ cep });

      return res.status(200).send(data);
    } catch (err) {
      return catchError(res, err);
    }
  }
}
