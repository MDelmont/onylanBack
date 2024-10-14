import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface GameInterface {
    name: string;
    categorie: string;
    description: string;
    pictureUrl: string;
    downloadDescription: string;
    price : number
}

export class Game {
    constructor() {
    }

    /**
     * Get all games of a user with pagination
     * @param {number} userId - user id
     * @param {number} [page] - page number, default undefined
     * @returns {Promise<GameInterface[]>} - array of games
     */
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
            console.error('error in getGames : ', error);
            throw error; // Throw the error to be handled by the caller
        } finally {
            await prisma.$disconnect(); // Disconnect from the Prisma client
        }
    }

    /**
     * Get a game by its id
     * @param {number} id - the id of the game
     * @returns {Promise<Game>} - the game object
     */
    public static async getGameByID(id: number) {
        try {
            const res = await prisma.game.findUnique(
                {
                    where: {
                        id: id,
                    },
                    include: {
                        modes: {
                            select: {
                              id: true,
                              name: true,
                            },
                          },
                      },
                }
            );
            return (res);
        } catch (error) {
            console.error('error in getGameByID : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Get the average and count of notes for the given games id
     * @param {number[]} ids - the ids of the games
     * @returns {Promise<{idGame: number, _avg: {note: number}, _count: {note: number}}[]>} - an array of game id and the average note and the count of notes
     */
    public static async getNoteByGames(ids: number[]) {
        try {
            const res = await prisma.userGame.groupBy(
                {
                    by: ['idGame'],
                    where: {
                        idGame:{ in: ids},
                        
                    },
                    _avg :{
                        note:true
                    },
                    _count :{
                        note:true
                    },
                    
                }
            );
            return (res);
        } catch (error) {
            console.error('error in getNoteByGames : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Get games by the given params
     * @param {object} params - the params to filter the games
     * @returns {Promise<GameInterface[]>} - an array of games
     */
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
            console.error('error in getGameByParams : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Update a game
     * @param {number} id - the id of the game
     * @param {object} params - the params to update the game
     * @returns {Promise<GameInterface>} - the updated game
     */
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
            console.error('error in updateGame : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Create a new game
     * @param {GameInterface} params - the params of the game
     * @returns {Promise<GameInterface>} - the created game
     */
    public static async createGame(params: GameInterface) {
        try {
            const res = await prisma.game.create({
                data: {
                    ...params
                }
            });
            return res;
        } catch (error) {
            console.error('error in createGame : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Delete a game
     * @param {number} id - the id of the game
     * @returns {Promise<import('@prisma/client').Game>} - the deleted game
     */
    public static async deteleGame(id: number) {
        try {
            const res = await prisma.game.delete({
                where: {
                    id: id,
                },
            });
            return res;
        } catch (error) {
            console.error('error in deteleGame : ', error);
            throw error; // Throw the error to be handled by the caller
        } finally {
            await prisma.$disconnect(); // Disconnect from the Prisma client
        }
    }

   
}