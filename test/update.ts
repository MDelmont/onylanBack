import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        const res = await prisma.test_tiers.updateMany({
            where: {nom: 'Test'},
            data: {
                nom: 'Notest'
            }
        });
        console.log(res);
        const res2 = await prisma.test_tiers.update({
            where: { id: 1 },
            data: {
                nom: 'Test'
            }
        });
        console.log(res2);
    } catch (error) {
        console.log(error);
    } finally {
        async() => {
            await prisma.$disconnect();
        }
    }
}

main();