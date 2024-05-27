
import { UtilsResponse } from '../utils/utilsApi';
import { UtilsForm } from '../utils/utilsForm';
import { UtilsFunction } from '../utils/utilsFunction';
import { UtilsUser } from '../utils/utilsUser';
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { InvitationToken } from '../model/invitationToken';
import { User } from '../model/user';
import fs from 'fs';
import path from 'path';
const prisma = new PrismaClient();

export class UserCtrl {
    constructor() {
    }

    public static async getUserAuth(req: any, res: any, next: any) {
        try {
            const user = await User.getUserById(req.auth.userId)
        
            if (!user){
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'User not exist',
                    data: null,
                });
            }

            const userFiltredWithFile = await UtilsUser.filtredUser(user)
            
           
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'getUserAuth successfully',
                data: userFiltredWithFile,
            })

           
        } catch (error) {
            // Handle any errors
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'fail to getUserAuth',
                data: null,
            });
        }

    }


    public static async getIsAdminUser(req: any, res: any, next: any) {
        try {
        
            const user = await User.getUserById(req.auth.userId)
    
            if (!user){
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'User not exist',
                    data: null,
                });
            }
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'getIsAdminUser successfully',
                data: user.isAdmin,
            })

        } catch (error) {
            // Handle any errors
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'fail to getIsAdminUser',
                data: null,
            });
        }

    }

    public static async getUserById(req: any, res: any, next: any) {
        try {

            const userId = req.auth.userId
            const playerId = req.params.userId
      
            const user = await User.getUserById(userId)
            const player = await User.getUserById(parseInt(playerId))
            


            if (!player || !user){
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'User not exist',
                    data: null,
                });
            }

            const userFiltredWithFile = await UtilsUser.filtredUser(user)
            let filtredUser;
            if(user?.isAdmin || user.id == player.id) {
                filtredUser =userFiltredWithFile
            } else {
                filtredUser = {pseudo : userFiltredWithFile.pseudo, budget:userFiltredWithFile.budget}

            }
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'getUserById successfully',
                data: filtredUser,
            })

        } catch (error) {
            // Handle any errors
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'fail to getIsAdminUser',
                data: null,
            });
        }

    }

    public static async getIsAuthUser(req: any, res: any, next: any) {
        try {
        
            const user = await User.getUserById(req.auth.userId)
    
            if (!user){
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'User not exist',
                    data: false,
                });
            }
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'getIsAdminUser successfully',
                data: true,
            })

        } catch (error) {
            // Handle any errors
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'fail to getIsAdminUser',
                data: null,
            });
        }

    }

    public static async getInvitation(req: any, res: any, next: any) {
        try {
     
            const invitToken: string = req.params.invitToken;
            
        
            const invitData = await InvitationToken.getInvitationTokenByToken(invitToken);
            if (!invitData){

                
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Failed to get inviation',
                    data: null,
                });
            }

            const user = await User.getUserById(invitData.userId)
            // Send success response with a login token

            if (!user){

                
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Failed to get inviation',
                    data: null,
                });
            }
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'Succes get token',
                data: {
                    user : {...user},
                    invitation: invitData,
                },
            });
        } catch (error) {
            // Send error response with UserID for debugging
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'Failed to get inviation',
                data: null,
            });
        }
    }  
    

    public static async deleteInvitaton(req: any, res: any, next: any) {
        console.log('start deleteInvitaton')
        try {
            const {invitationId} = req.params
            const invitationToken = await InvitationToken.getInvitationTokenByID(parseInt(invitationId))
            const invitDelete = await InvitationToken.deteleInvitations(parseInt(invitationId))
      
            if (!invitDelete){
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Failed to delete Invitaton',
                    data: null,
                });
    
            }
            if(invitationToken?.userId){
                await User.deteleUserById(invitationToken?.userId)
            }
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'Success to delete Invitaton',
                data: null,
            });
        } catch (error) {
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'Failed to delete Invitaton',
                data: null,
            });
        }
    }
    public static async createInvitation(req: any, res: any, next: any) {
        console.log('start createInvitation')
        let user: any;
        try {
            const requiredFields = ['name', 'firstName'];
            const missingFields = await UtilsForm.checkMissingField(req, requiredFields)
            if (missingFields.length > 0) {
                return UtilsResponse.missingFieldResponse(res, missingFields)
            }
        
            const token = await UtilsFunction.generateToken();
            user = await User.createUser({name: req.body.name, firstName: req.body.firstName, isAdmin: false});
            const inivit = await InvitationToken.createInvitationToken(user.id, token);
            // Send success response with a login token
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'Success to create',
                data: {
                    userId: user.id,
                    token :inivit.token,
                },
            });
        } catch (error) {
            // Send error response with UserID for debugging
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'Failed to create',
                data: null,
            });
        }
    }
    public static async getInvitations(req: any, res: any, next: any) {
        console.log("Start getInvitations")
        try {
          
        
            const invitData = await InvitationToken.getInvitations();
            console.log(invitData)
            if (!invitData){
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Failed to get inviations',
                    data: null,
                });
            }

            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'Succes to getInvitations',
                data: {
                    invitation: invitData,
                },
            });
        } catch (error) {
            // Send error response with UserID for debugging
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'Failed to get inviation',
                data: null,
            });
        }
    }  

    
}