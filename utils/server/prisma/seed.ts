import { hash } from "bcrypt";
import "dotenv/config";

import { prisma } from "./prisma";

(async () => {
  const username = process.env.ADMIN_USERNAME!;
  const password = process.env.ADMIN_PASSWORD!;
  try {
    await prisma.user.upsert({
      where: {
        name: "admin",
      },
      update: {},
      create: {
        name: "admin",
        username,
        password: await hash(password, 10),
        admin: true,
        description: "admin",
        note: "admin",
      },
    });
    console.log("seed to postgreql success.");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  await prisma.$disconnect();
})();
