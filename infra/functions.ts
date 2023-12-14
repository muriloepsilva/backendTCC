import { internal_server_error } from "./constants";
import prismaClient from "./prisma";

export function catchError(res, error) {
  if (error instanceof Error)
    return res.status(400).json({ errorMsg: error.message });

  return res.status(500).send(internal_server_error);
}

export async function getCategory(categoryName) {
  return prismaClient.category.findFirst({
    select: { id: true },
    where: { name: categoryName },
  });
}
