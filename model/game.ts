import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface GameInterface {
    name: string;
    categorie: string;
    description: string;
    pictureUrl: string;
    downloadDescription: string;
}

export class Game {
    constructor() {
    }

    public static async getGames(userId:number,page?: number) {
        try {
            // pagination: 10 jeux max sur la page, modifié nbGame pour mettre plus ou moins de jeux
            const nbGame = 10;
            let res = null;
            if (page) {
                const number = (page - 1) * nbGame
                res = await prisma.game.findMany({
                    skip: number,
                    take: nbGame,
                    include: {
                        userGames: {
                            where: {
                                idUser: userId
                            },
                            select: {
                                note: true
                            }
                        }
                    }
                });
            } else {
                res = await prisma.game.findMany({
                    include: {
                        userGames: {
                            where: {
                                idUser: userId
                            },
                            select: {
                                note: true
                            }
                        }
                    }
                });  
            }
            return res;
        } catch (error) {
            console.log(error);
            throw error; // Throw the error to be handled by the caller
        } finally {
            await prisma.$disconnect(); // Disconnect from the Prisma client
        }
    }

    public static async getGameByID(id: number) {
        try {
            const res = await prisma.game.findUnique(
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

    public static async getGameByParams(params: {}) {
        try {
            const res = await prisma.game.findMany(
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

    public static async updateGame(id: number, params: {}) {
        try {
            const res = await prisma.game.update({
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
    public static async createGame(params: GameInterface) {
        try {
            const res = await prisma.game.create({
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

    public static async deteleGame(id: number) {
        try {
            const res = await prisma.game.delete({
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