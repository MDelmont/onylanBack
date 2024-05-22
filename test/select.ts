import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        const res = await prisma.test_tiers.findMany(
            {
                where: {
                    id: {
                        gt: 1
                    }
                }
            }
        );
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