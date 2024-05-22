import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class InvitationToken {
    constructor() {
    }

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
            console.log(error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }


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
            console.log(error);
        } finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

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
            console.log(error);
        } finally {
            async() => {
                await prisma.$disconnect();
            }
        }
    }
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
        }
        finally {
            async () => {
                await prisma.$disconnect();
            }
        }
    }

   
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
        console.log(error);
        throw error; // Throw the error to be handled by the caller
    } finally {
        await prisma.$disconnect(); // Disconnect from the Prisma client
    }
}

public static async deteleInvitations(id:number) {
    try {
        const res = await prisma.invitationToken.delete({
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