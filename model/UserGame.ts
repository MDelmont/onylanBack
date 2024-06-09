import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserGameInterface {
    idUser: number;
    idGame: number;
    note: number;
}

export class UserGame {
    constructor() {
    }
    public static async findUserGame(idUser: number, idGame: number) {
        try {
            const res = await prisma.userGame.findUnique({
                where: {
                    idUser_idGame: {
                        idUser: idUser,
                        idGame: idGame
                    }
                },
            });
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    public static async createUserGame(params:UserGameInterface) {
        try {
            const res = await prisma.userGame.create({
                data: {
                    ...params
                }
            });
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    public static async updateUserGame(idUser: number, idGame: number, note: number) {
        try {
            const res = await prisma.userGame.update({
                where: {
                    idUser_idGame: {
                        idUser: idUser,
                        idGame: idGame
                    }
                },
                data: {
                    note: note
                }
            });
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    public static async deleteUserGame(idGame: number) {
        try {
            const res = await prisma.userGame.deleteMany({
                where: {
                
                    idGame: idGame
                
                },
            });
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            await prisma.$disconnect();
        }
    }

}
