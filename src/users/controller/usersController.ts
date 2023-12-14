import { Request, Response } from "express";
import { internal_server_error } from "../../../infra/constants";
import { catchError } from "../../../infra/functions";
import UsersService from "../service/usersService";

export default class UsersController {
  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const service = new UsersService();

    try {
      const data = await service.createUser({ name, email, password });

      return res.status(200).send(data);
    } catch (error) {
      return catchError(res, error);
    }
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const service = new UsersService();

    try {
      const data = await service.loginUser({ email, password });

      return res.status(200).send(data);
    } catch (error) {
      return catchError(res, error);
    }
  }

  async userDetails(req: Request, res: Response) {
    const service = new UsersService();
    const userId = req.userId;

    try {
      const data = await service.userDetails(userId);
      return res.status(200).send(data);
    } catch (error) {
      return catchError(res, error);
    }
  }
}
