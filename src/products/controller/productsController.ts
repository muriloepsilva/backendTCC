import { Request, Response } from "express";
import {
  deletedProduct,
  deletedUser,
  noProducts,
} from "../../../infra/constants";
import { catchError } from "../../../infra/functions";
import ProductsService from "../service/productsService";

interface MulterRequest extends Request {
  file: any;
}

export default class ProductsController {
  async createProducts(req: Request, res: Response) {
    const { name, price, description, categoryName } = req.body;
    const banner = (req as MulterRequest).file;

    const service = new ProductsService();

    try {
      const data = await service.createProduct({
        name,
        price,
        description,
        banner,
        categoryName,
      });

      return res.status(200).send(data);
    } catch (error) {
      return catchError(res, error);
    }
  }

  async getProducts(req: Request, res: Response) {
    const service = new ProductsService();

    try {
      const data = await service.listAllProducts();

      return res.status(200).send(data);
    } catch (error) {
      return catchError(res, error);
    }
  }

  async getProductsHome(req: Request, res: Response) {
    const service = new ProductsService();

    try {
      const data = await service.listProductsHome();

      if (data.length === 0) return res.status(204).send(noProducts);

      return res.status(200).send(data);
    } catch (error) {
      return catchError(res, error);
    }
  }

  async getProductByName(req: Request, res: Response) {
    const { productName } = req.body;
    const service = new ProductsService();

    try {
      const data = await service.listProductByName({ productName });

      return res.status(200).send(data);
    } catch (error) {
      return catchError(res, error);
    }
  }

  async getProductById(req: Request, res: Response) {
    const { parametro } = req.headers;

    const productId = parametro;
    const service = new ProductsService();

    try {
      const data = await service.getProductById({ productId });

      return res.status(200).send(data);
    } catch (error) {
      return catchError(res, error);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const { productid } = req.headers;
    console.log(productid);

    const service = new ProductsService();

    try {
      const data = await service.deleteProduct({ productid });

      return res.status(200).send(deletedProduct);
    } catch (error) {
      return catchError(res, error);
    }
  }

  async editProducts(req: Request, res: Response) {
    const { productId, name, price, description, banner, categoryName } =
      req.body;

    const service = new ProductsService();

    try {
      const data = await service.editProducts({
        productId,
        name,
        price,
        description,
        banner,
        categoryName,
      });

      return res.status(200).send(data);
    } catch (err) {
      return catchError(res, err);
    }
  }

  async insertProductCart(req: Request, res: Response) {
    const { productid } = req.body;
    const service = new ProductsService();

    try {
      const data = await service.insertProductCart({ productid });

      return res.status(200).send(data);
    } catch (err) {
      return catchError(res, err);
    }
  }

  async getProductCart(req: Request, res: Response) {
    const service = new ProductsService();

    try {
      const data = await service.getProductCart();

      return res.status(200).send(data);
    } catch (err) {
      return catchError(res, err);
    }
  }
}
