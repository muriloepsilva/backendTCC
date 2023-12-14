import { Request, Response } from "express";
import { servicesVersion } from "typescript";
import { internal_server_error, invalidName } from "../../../infra/constants";
import { catchError } from "../../../infra/functions";
import CategoryService from "../service/categoryService";

export default class CategoryController {
  async createCategory(req: Request, res: Response) {
    const { name } = req.body;
    const service = new CategoryService();

    try {
      const data = await service.createCategory({ name });

      return res.status(200).send(data);
    } catch (error) {
      return catchError(res, error);
    }
  }

  async listAllCategories(req: Request, res: Response) {
    const service = new CategoryService();

    try {
      const data = await service.listAllCategories();

      return res.status(200).send(data);
    } catch (error) {
      return catchError(res, error);
    }
  }

  async listCategoryByName(req: Request, res: Response) {
    const { name } = req.params;
    const service = new CategoryService();

    try {
      const data = await service.listCategoryByName({ name });

      return res.status(200).send(data);
    } catch (error) {
      return catchError(res, error);
    }
  }

  async deleteCategory(req: Request, res: Response) {
    const { productid } = req.headers;
    const service = new CategoryService();

    try {
      const data = await service.deleteCategory({ productid });

      return res.status(200).send(data);
    } catch (err) {
      return catchError(res, err);
    }
  }

  async editCategory(req: Request, res: Response) {
    const { id, name } = req.body;

    const service = new CategoryService();

    try {
      const data = await service.editCategory({ id, name });

      return res.status(200).send(data);
    } catch (err) {
      return catchError(res, err);
    }
  }
}
