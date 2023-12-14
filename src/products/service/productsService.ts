import { deletedUser, fillAll } from "../../../infra/constants";
import { getCategory } from "../../../infra/functions";
import prismaClient from "../../../infra/prisma";

export default class ProductsService {
  async createProduct({ name, price, description, banner, categoryName }) {
    if (!name || !price || !description || !banner || !categoryName)
      throw new Error(fillAll);

    const categoryId = await getCategory(categoryName);

    return prismaClient.product.create({
      data: {
        name: name,
        price: price,
        description: description,
        banner: banner.firebaseUrl,
        categoryId: categoryId.id,
      },
    });
  }

  async listAllProducts() {
    const responseDb = await prismaClient.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        categoryId: true,
      },
    });

    const newObj = await Promise.all(
      responseDb.map(async (item) => {
        const catName = await prismaClient.category.findFirst({
          select: {
            name: true,
          },
          where: {
            id: item.categoryId,
          },
        });

        return {
          id: item.id,
          name: item.name,
          category: catName.name,
          description: item.description,
          price: item.price,
          banner: item.banner,
        };
      })
    );

    return newObj;
  }

  async listProductsHome() {
    return prismaClient.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        banner: true,
      },
    });
  }

  async listProductByName({ productName }) {
    return prismaClient.product.findFirst({
      where: { name: productName },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        categoryId: true,
      },
    });
  }

  async getProductById({ productId }) {
    return prismaClient.product.findFirst({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        categoryId: true,
      },
    });
  }

  async deleteProduct({ productid }) {
    return prismaClient.product.delete({ where: { id: productid } });
  }

  async editProducts({
    productId,
    name,
    price,
    description,
    banner,
    categoryName,
  }) {
    const categoryId = await getCategory(categoryName);

    return prismaClient.product.update({
      where: { id: productId },

      data: {
        name: name,
        price: price,
        description: description,
        banner: banner,
        categoryId: categoryId.id,
      },
    });
  }

  async insertProductCart({ productid }) {
    return prismaClient.cart.create({
      data: { productId: productid },
    });
  }

  async getProductCart() {
    const productInCart = await prismaClient.cart.findMany({
      select: { productId: true },
    });

    console.log(productInCart);

    return prismaClient.product.findMany({
      where: {
        id: productInCart.map((item) => {
          return item.productId;
        })[0],
      },
      select: { name: true, price: true, banner: true },
    });
  }
}
