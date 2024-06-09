import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ModeInterface {
    name: string;
    description: string;
    installationGuide: string;
    scoreRules: string;
    idGame: number;
}

export class Mode {
    constructor() {
    }
    public static async getModes() {
        try {
            const res = await prisma.mode.findMany(
            );
            return (res);
        } catch (error) {
            console.log(error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }
    public static async getModeByID(id: number) {
        try {
            const res = await prisma.mode.findUnique(
                {
                    where: {
                        id: id,
                    }
                }
            );
            return (res);
        } catch (error) {
            console.log(error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }
    public static async getModeByParams(params: {}) {
        try {
            const res = await prisma.mode.findMany(
                {
                    where: {
                        ...params
                    }
                }
            );
            return (res);
        } catch (error) {
            console.log(error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }
    public static async updateMode(id: number, params: {}) {
        try {
            const res = await prisma.mode.update({
                where: { id },
                data: {
                    ...params
                }
            });
            return (res);
        } catch (error) {
            console.log(error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }
    public static async createMode(params: ModeInterface) {
        try {
            const res = await prisma.mode.create({
                data: {
                    ...params
                }
            });
            return res;
        }
        finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }
    public static async deteleMode(id: number) {
        try {
            const res = await prisma.mode.delete({
                where: {
                    id: id,
                },
            });
            return res;
        } catch (error) {
            console.log(error);
            throw error; // Throw the error to be handled by the caller
        } finally {
            await prisma.$disconnect(); // Disconnect from the Prisma client
        }
    }
}