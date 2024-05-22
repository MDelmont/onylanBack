import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        const res = await prisma.test_tiers.delete({
            where: {id: 6}
        });
        console.log(res);
    } catch (error) {
        console.log(error);
    } finally {
        async() => {
            await prisma.$disconnect();
        }
    }
}

main();