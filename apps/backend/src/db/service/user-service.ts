import { prisma } from "@/db";
import { PrismaClient } from "@/generated/prisma/client";

export class UserService {
  constructor(private readonly db: PrismaClient) {}

  findById(id: number) {
    return this.db.user.findUnique({ where: { id } });
  }

  findByTelegramId(telegramId: bigint) {
    return this.db.user.findUnique({ where: { telegramId } });
  }

  upsert(data: {
    telegramId: bigint;
    username?: string | null;
    firstName?: string | null;
  }) {
    return this.db.user.upsert({
      where: { telegramId: data.telegramId },
      create: data,
      update: { username: data.username, firstName: data.firstName },
    });
  }
}

export const userService = new UserService(prisma);
