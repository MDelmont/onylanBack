import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserInterface {
    isAdmin?: boolean | null ;
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

    /**
     * Get many users from database
     * @param {object} params - object with params to filter users
     * @returns {Promise<UserInterface[]>} - array of users
     */
    public static async getManyUser(params:any) {
        try {
            const res = await prisma.user.findMany({
                where: {
                    ...params
                }
            }
            );
            console.log(res);
            return res;
        } catch (error) {
            console.error('error in getManyUser : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Get many users from database with given params
     * @param {UserInterface} params - object with params to filter users
     * @returns {Promise<UserInterface[]>} - array of users
     */
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
            console.error('error in getManyUserByParams : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Get a user by its id
     * @param {number} id - the id of the user
     * @returns {Promise<UserInterface | null>} - the user object or null if not found
     */
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
            console.error('error in getUserById : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }
    
    /**
     * Get a user by its parameters
     * @param {object} params - object with params to filter users
     * @returns {Promise<UserInterface | null>} - the user object or null if not found
     */
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
            console.error('error in getUserByParams : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Update a user
     * @param {number} id - the id of the user to update
     * @param {object} params - the params to update the user
     * @returns {Promise<UserInterface | null>} - the updated user object or null if not found
     */
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
            console.error('error in updateUser : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }
    
    /**
     * Create a new user
     * @param {UserInterface} params - the params of the user
     * @returns {Promise<UserInterface>} - the created user object
     */
    public static async createUser(params: UserInterface) {
        try {
            const res = await prisma.user.create({
                data: {
                    ...params
                }
            });
            return res;
        } catch (error) {
            console.error('error in createUser : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Delete a user by its id
     * @param {number} id - the id of the user
     * @returns {Promise<UserInterface | null>} - the deleted user object or null if not found
     */
    public static async deleteUserById(id: number) {
        try {
            const res = await prisma.user.delete({
                where: {
                    id: id,
                },
            });
            return res;
        } catch (error) {
            console.error('error in deleteUserById : ', error);
        } finally {
            await prisma.$disconnect(); // Disconnect from the Prisma client
        }
    }

}