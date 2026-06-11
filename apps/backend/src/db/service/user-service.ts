import { prisma } from "@/db";
import { Prisma, PrismaClient } from "@/generated/prisma/client";

export class UserService {
  constructor(private readonly db: PrismaClient) {}

  findById(id: number) {
    return this.db.user.findUnique({ where: { id } });
  }

  findByTelegramId(telegramId: bigint) {
    return this.db.user.findUnique({ where: { telegramId } });
  }

  create(data: Prisma.UserCreateInput) {
    return this.db.user.create({ data });
  }

  upsert(data: Prisma.UserCreateInput) {
    return this.db.user.upsert({
      where: { telegramId: data.telegramId as bigint },
      create: data,
      update: { username: data.username, firstName: data.firstName },
    });
  }
}

export const userService = new UserService(prisma);
