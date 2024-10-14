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

    /**
     * Find a user game by its idUser and idGame
     * @param {number} idUser - the id of the user
     * @param {number} idGame - the id of the game
     * @returns {Promise<UserGameInterface | null>} - the user game object or null if not found
     */

    /**
     * Find a user game by its idUser and idGame
     * @param {number} idUser - the id of the user
     * @param {number} idGame - the id of the game
     * @returns {Promise<UserGameInterface | null>} - the user game object or null if not found
     */
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
            console.error('error in findUserGame : ', error);
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * Create a new user game
     * @param {UserGameInterface} params - the params of the user game
     * @returns {Promise<UserGameInterface>} - the created user game object
     */
    public static async createUserGame(params:UserGameInterface) {
        try {
            const res = await prisma.userGame.create({
                data: {
                    ...params
                }
            });
            return res;
        } catch (error) {
            console.error('error in createUserGame : ', error);
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * Update a user game
     * @param {number} idUser - the id of the user
     * @param {number} idGame - the id of the game
     * @param {number} note - the new note of the user game
     * @returns {Promise<UserGameInterface>} - the updated user game object
     */
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
            console.error('error in updateUserGame : ', error);
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * Delete all user games for a given game id
     * @param {number} idGame - the id of the game
     * @returns {Promise<import('@prisma/client').BatchPayload>} - the result of the deletion
     */
    public static async deleteUserGame(idGame: number) {
        try {
            const res = await prisma.userGame.deleteMany({
                where: {
                
                    idGame: idGame
                
                },
            });
            return res;
        } catch (error) {
            console.error('error in deleteUserGame : ', error);
        } finally {
            await prisma.$disconnect();
        }
    }

}
