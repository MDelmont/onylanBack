import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        const res = await prisma.test_tiers.createMany({
            data: [
                {
                    nom: 'Test',
                    prenom: 'Jean'
                },
                {
                    nom: 'Test2',
                    prenom: 'Jeanne'
                },
                {
                    nom: 'Repud',
                    prenom: 'Michael'
                }
            ]
        });
        const res2 = await prisma.test_tiers.create({
            data: {
                nom: 'Boyka',
                prenom: 'Yuri'
            }
        });
        console.log(res);
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