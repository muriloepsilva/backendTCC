import prismaClient from "../../../infra/prisma";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import {
  emailAlreadyExists,
  errorLogin,
  mandatoryFields,
} from "../../../infra/constants";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}
export default class UsersService {
  async createUser({ name, email, password }: UserRequest) {
    if (!email) throw new Error(mandatoryFields.email);
    if (!password) throw new Error(mandatoryFields.password);
    if (!name) throw new Error(mandatoryFields.name);

    const databaseEmail = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (databaseEmail) throw new Error(emailAlreadyExists);

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }

  async loginUser({ email, password }: LoginUser) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) throw new Error(errorLogin);

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error(errorLogin);

    return { id: user.id, name: user.name, email: user.email };
  }

  async userDetails(userId) {
    return prismaClient.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}
