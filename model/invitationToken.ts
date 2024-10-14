import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class InvitationToken {
    constructor() {
    }


    /**
     * Get an invitation token by its token
     * @param {string} token - Invitation token
     * @returns {Promise<InvitationToken | null>} - Invitation token or null if not found
     */
public static async getInvitationTokenByToken(token: string) {
        try {
            const res = await prisma.invitationToken.findFirst(
                {
                    where: {
                        isActive: true,
                        token: token
                    }
                }
            );
            return(res);
        } catch (error) {
            console.error('error in getInvitationTokenByToken : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Get an invitation token by its id
     * @param {number} id - Invitation token id
     * @returns {Promise<InvitationToken | null>} - Invitation token or null if not found
     */
    public static async getInvitationTokenByID(id: number) {
        try {
            const res = await prisma.invitationToken.findUnique(
                {
                    where: {
                        id: id,
                    }
                }
            );
            return(res);
        } catch (error) {
            console.error('error in getInvitationTokenByID : ', error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Update an invitation token
     * @param {number} id - The id of the invitation token to update
     * @param {object} params - The params to update the invitation token
     * @returns {Promise<InvitationTokenInterface | null>} - The updated invitation token or null if not found
     */
    public static async updateInvitationToken(id: number, params: {}) {
        try {
            const res = await prisma.invitationToken.update({
                where: { id },
                data: {
                    ...params
                }
            });
            return (res);
        } catch (error) {
            console.error('error in updateInvitationToken : ', error);
        } finally {
            async() => {
                await prisma.$disconnect();
            }
        }
    }

    /**
     * Create a new invitation token
     * @param {number} userId - The id of the user who sent the invitation
     * @param {string} token - The token of the invitation
     * @returns {Promise<InvitationTokenInterface>} - The created invitation token
     */
    public static async createInvitationToken(userId: number, token: string) {
        try {
            const res = await prisma.invitationToken.create({
                data: {
                   userId,
                   token,
                   isActive: true
                }
            });
            return res;
        } catch (error) {
            console.error('error in createInvitationToken : ', error);
        }
        finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

   
    /**
     * Get all invitations
     * @returns {Promise<InvitationTokenInterface[]>} - Array of invitation tokens
     */
public static async getInvitations() {
    try {
        const res = await prisma.invitationToken.findMany({
            where: {
                isActive: true,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        firstName: true,
                    },
                },
            },
        });
        return res;
    } catch (error) {
        console.error('error in getInvitations : ', error);
        throw error; // Throw the error to be handled by the caller
    } finally {
        await prisma.$disconnect(); // Disconnect from the Prisma client
    }
}

    /**
     * Delete an invitation token
     * @param {number} id - The id of the invitation token to delete
     * @returns {Promise<InvitationTokenInterface | null>} - The deleted invitation token or null if not found
     */
public static async deteleInvitations(id:number) {
    try {
        const res = await prisma.invitationToken.delete({
            where: {
                id: id,
            },
        });
        return res;
    } catch (error) {
        console.error('error in deteleInvitations : ', error);
        throw error; // Throw the error to be handled by the caller
    } finally {
        await prisma.$disconnect(); // Disconnect from the Prisma client
    }
}
}