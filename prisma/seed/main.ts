import { prisma } from "../../src/libs/prisma";

import createUsers from "./users";

async function main() {
	console.log("[Start seeding]");

	await createUsers();

	console.log("[Finish seeding]");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
