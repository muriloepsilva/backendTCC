import { categoryExists, invalidName } from "../../../infra/constants";
import prismaClient from "../../../infra/prisma";

interface CategoryRequest {
  name: string;
}

export default class CategoryService {
  async createCategory({ name }: CategoryRequest) {
    if (!name || name === "") throw new Error(invalidName);

    const nameDb = await prismaClient.category.findFirst({
      where: { name: name },
    });

    if (nameDb) throw new Error(categoryExists);

    const responseDb = await prismaClient.category.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return responseDb;
  }

  async listAllCategories() {
    const responseDb = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return responseDb;
  }

  async listCategoryByName({ name }) {
    if (!name) throw new Error(invalidName);

    const nameDb = await prismaClient.category.findFirst({
      where: { name: name },
    });

    if (nameDb === null) throw new Error(invalidName);

    return nameDb;
  }

  async deleteCategory({ productid }) {
    return prismaClient.category.delete({ where: { id: productid } });
  }

  async editCategory({ id, name }) {
    return prismaClient.category.update({
      where: { id: id },
      data: { name: name },
    });
  }
}
