import { prisma } from './_prisma.service';

import createUsers from './user';

async function main() {
  console.log('[Start seeding]');

  await createUsers();

  console.log('[Finish seeding]');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
