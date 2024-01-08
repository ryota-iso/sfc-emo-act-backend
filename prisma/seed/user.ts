import { Prisma } from '@prisma/client';
import { prisma } from './_prisma.service';
import bcrypt = require('bcrypt');

async function createUsers() {
  console.log('---------- create users ----------');

  const hashedPassword = await bcrypt.hash('password', 10);
  const users: Prisma.UserCreateInput[] = [...Array(3)].map((_, i) => ({
    name: `test_${i + 1}`,
    password: hashedPassword,
  }));

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });
}

export default createUsers;
