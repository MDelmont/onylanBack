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

    /**
     * Get all modes
     * @returns {Promise<ModeInterface[]>} - array of all modes
     */
    public static async getModes() {
        try {
            const res = await prisma.mode.findMany(
            );
            return (res);
        } catch (error) {
            console.error('error in getModes : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Get a mode by its id
     * @param {number} id - the id of the mode
     * @returns {Promise<ModeInterface & { game: { name: string, id: number } }>} - the mode object with the game name and id
     */
    public static async getModeByID(id: number) {
        try {
            const res = await prisma.mode.findUnique(
                {
                    where: {
                        id: id,
                    },
                    include :{
                        game: {
                            select: {
                              name: true,
                              id:true,
                            },
                          },
                    }
                }
            );
            return (res);
        } catch (error) {
            console.error('error in getModeByID : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Get modes by the given params
     * @param {object} params - the params to filter the modes
     * @returns {Promise<ModeInterface[]>} - an array of modes
     */
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
            console.error('error in getModeByParams : ', error);;
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Update a mode
     * @param {number} id - the id of the mode to update
     * @param {object} params - the params to update the mode
     * @returns {Promise<ModeInterface | null>} - the updated mode or null if not found
     */
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
            console.error('error in updateMode : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Create a new mode
     * @param {ModeInterface} params - the params of the mode
     * @returns {Promise<ModeInterface>} - the created mode
     */
    public static async createMode(params: ModeInterface) {
        try {
            const res = await prisma.mode.create({
                data: {
                    ...params
                }
            });
            return res;
        } catch (error) {
            console.error('error in createMode : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Delete a mode
     * @param {number} id - the id of the mode
     * @returns {Promise<ModeInterface>} - the deleted mode
     */
    public static async deteleMode(id: number) {
        try {
            const res = await prisma.mode.delete({
                where: {
                    id: id,
                },
            });
            return res;
        } catch (error) {
            console.error('error in deteleMode : ', error);
        } finally {
            await prisma.$disconnect(); // Disconnect from the Prisma client
        }
    }
}