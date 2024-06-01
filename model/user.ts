import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserInterface {
    isAdmin?: boolean | null;
    pseudo?: string | null;
    password?: string | undefined;
    name?: string | null;
    firstName?: string | null;
    email?: string | undefined;
    pictureUrl?: string | null;
    budget?: string | null;
    resetToken?: string | null;

}

export class User {
    constructor() {
    }

    public static async getManyUser() {
        try {
            const res = await prisma.user.findMany();
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }
    public static async getManyUserByParams(params: UserInterface) {
        try {
            const res = await prisma.user.findMany(
                {
                    where: {
                        ...params
                    }
                }
            );
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    public static async getUserById(id: number) {
        try {
            const res = await prisma.user.findUnique(
                {
                    where: {
                        id: id
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
    public static async getUserByParams(params: {}) {
        try {
            const res = await prisma.user.findFirst(
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
    public static async getUserByToken(token: string) {
        try {
            const res = await prisma.user.findFirst(
                {
                    where: {
                        token: {
                            isActive: true,
                            token: token
                        }
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

    public static async updateUser(id: number, params: UserInterface) {
        try {
            const res = await prisma.user.update({
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
    public static async createUser(params: UserInterface) {
        try {
            const res = await prisma.user.create({
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

    public static async deteleUserById(id: number) {
        try {
            const res = await prisma.user.delete({
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

    // public static async insertTiers(newtiers) {
    // }

    // public static async deleteTiers(id) {
    // }
}