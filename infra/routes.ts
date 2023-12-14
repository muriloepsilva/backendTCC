import { Router } from "express";
import multer from "multer";
import CategoryController from "../src/categories/controller/categoryController";
import ProductsController from "../src/products/controller/productsController";
import UsersController from "../src/users/controller/usersController";
import CorreioController from "../src/correio/controller/correioController";
import { isAuthenticated } from "./middleware";
import PaymentController from "../src/payment/controller/paymentController";

const router = Router();

const Multer = multer({
  storage: multer.memoryStorage(),
});
const uploadImage = require("./firebase");

router.get("/", (req, res) => {
  res.send("Funcionando");
});

router.post("/users", new UsersController().createUser);
router.post("/login", new UsersController().loginUser);
router.get("/details", isAuthenticated, new UsersController().userDetails);

router.post("/category", new CategoryController().createCategory);
router.get("/listCategories", new CategoryController().listAllCategories);
router.get(
  "/listCategoryByName/:name",
  new CategoryController().listCategoryByName
);
router.delete("/deleteCat", new CategoryController().deleteCategory);
router.post("/editCat", new CategoryController().editCategory);

router.post(
  "/createProduct",
  Multer.single("files"),
  uploadImage,
  new ProductsController().createProducts
);
router.get("/listProduct", new ProductsController().getProductByName);
router.get("/listAllProducts", new ProductsController().getProducts);
router.get("/listHome", new ProductsController().getProductsHome);
router.delete("/deleteProduct", new ProductsController().deleteProduct);
router.post("/editProd", new ProductsController().editProducts);
router.get("/productById", new ProductsController().getProductById);
router.get("/productCart", new ProductsController().getProductCart);

router.post("/consultaCep", new CorreioController().searchCep);
router.post("/calcFrete", new CorreioController().calcularFrete);

router.post("/pagarCartao", new PaymentController().pagarCartao);
export { router };
