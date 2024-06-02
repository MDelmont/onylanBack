
import { UtilsResponse } from '../utils/utilsApi';
import { UtilsForm } from '../utils/utilsForm';
import { UtilsFunction } from '../utils/utilsFunction';
import { PrismaClient } from "@prisma/client";
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { InvitationToken } from '../model/invitationToken';
import { User } from '../model/user';

const secretKey: any = process.env.SECRET_KEY_JWT_AUTH;

export class AuthCtrl {
    constructor() {
    }

    /**
     * controller of login route (API)
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    public static async login(req: any, res: any, next: any) {

        let user: any;
        console.log("start Login")
        try {
            const requiredFields = ['email', 'password'];
            const missingFields = await UtilsForm.checkMissingField(req, requiredFields)
            if (missingFields.length > 0) {
                return UtilsResponse.missingFieldResponse(res, missingFields)
            }
            console.log("no missingFields")

            // Get user with email
            user = await User.getUserByParams({email:req.body.email})
            // Return response if user does not exist
            if (!user) {
                return UtilsResponse.loginPasswordInvalidResponse(res);
            }
            console.log("User exist",req.body.email)
            // Compare the password
   
            const valid = await bcrypt.compare(req.body.password, user.password);
            // Return response if password is not valid
            if (!valid) {
                return UtilsResponse.loginPasswordInvalidResponse(res);
            }
            console.log("It's good password")
            
            if (secretKey) {
                const token = jwt.sign(
                    { userId: user.id },
                    secretKey,
                    { expiresIn: '24h' }
                )
                res.cookie('token', token, { httpOnly: true, secure: false });
            }
            // Send success response with a login token
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'Success to login',
                data: {
                    userId: user._id,
                },
            });
        } catch (error) {
            // Send error response with UserID for debugging
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'Failed to login',
                data: { userId: user._id },
            });
        }
    };

    /**
    * Controller for the register route (API)
    * @param {*} req 
    * @param {*} res 
    * @param {*} next 
    */

    public static async register(req: any, res: any, next: any) {
        console.log("start register")
            let path=null;
            if (req.file){
                path = req.file.path
            }
        try {
            // check if requiredFields
            const requiredFields = ['name', 'firstName', 'email', 'password', 'confirmPassword', 'pseudo','budget','token'];
            const missingFields = await UtilsForm.checkMissingField(req, requiredFields)
            const token = req.params?.token;
            
            console.log("missingFields: ",missingFields)
            if (missingFields.length > 0) {
                if(path){
                    UtilsFunction.deleteFile(path)
                }
                return UtilsResponse.missingFieldResponse(res, missingFields)
                
               
            }
            let { email, password, confirmPassword,  pseudo, budget } = req.body;
            email = email.toLowerCase()

            const allErrors:string[] = [];
            // check password condition
            const errors = await UtilsForm.checkPasswordCondition(password, confirmPassword)
            console.log("password: ",errors)
            // return error if password condition not pass
            if (errors.length > 0) {
                console.log('Passwords do not match')
                allErrors.push('badPasswordError')
            }
            
            const errors2 = await UtilsForm.checkEmailCondition(email);

            console.log("EmailCondition: ",errors2)
            if (errors2.length > 0) {
                console.log('Email incorrect')
                allErrors.push('badEmailError')
            }
            const existingUser = await User.getManyUserByParams({ email });

            console.log("existing email: ",existingUser?true:false)
            if (existingUser && existingUser.length > 0) {
                console.log('User already exists with this email', email)
                allErrors.push('errorEmailAlreadyExists')
            }

            const existingUser2 = await User.getManyUserByParams({ pseudo });
            console.log("existing pseudo : ",existingUser2?true:false)
            if (existingUser2 && existingUser2.length > 0) {
                console.log('User already exists with this pseudo', pseudo)
                allErrors.push('errorPseudoAlreadyExists')
            }
            console.log("allErrors",allErrors)
            if (allErrors.length >0) {
                
                if(path){
                    UtilsFunction.deleteFile(path)
                }
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Invalid data for register',
                    data: {errors:allErrors},
                });
            }


            // Check if the user already exists
            const invitToken = await InvitationToken.getInvitationTokenByToken(token);

            console.log("invitToken",invitToken)
            if (!invitToken) {
                if(path){
                    UtilsFunction.deleteFile(path)
                }
                return UtilsResponse.response(res, {
                    statusCode: 500,
                    message: 'Invalid token',
                    data: null,
                });
            }

            const user = await User.getUserById(invitToken.userId);
            if (!user) {
                if(path){
                    UtilsFunction.deleteFile(path)
                }
                return UtilsResponse.response(res, {
                    statusCode: 500,
                    message: 'User not found',
                    data: null,
                });
            }

            
            const passwordHash = await bcrypt.hash(password, 10);
       
            const userFinalCreate = await User.updateUser(user.id, { email, password: passwordHash, pictureUrl: path, pseudo, isAdmin: false, budget:budget });
            if (userFinalCreate) {
                
                const isModifyInvit = await InvitationToken.updateInvitationToken(invitToken.id, {isActive: false});
    
                console.log('User registered successfully')
                return UtilsResponse.response(res, {
                    statusCode: 200,
                    message: 'User registered successfully',
                    data: null,
                });
            } else {
                if(path){
                    UtilsFunction.deleteFile(path)
                }
                return UtilsResponse.response(res, {
                    statusCode: 400,
                    message: 'Failed to register',
                    data: { email: req.body.email },
                });
            }
        } catch (error) {
            // Handle any errors
            console.log(error);
            if(path){
                UtilsFunction.deleteFile(path)
            }
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'Failed to register user',
                data: { email: req.body.email },
            });
        }
    };

   
    



   
    public static async logout(req: any, res: any, next: any) {
        try {
            res.clearCookie('token');
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'User logout successfully',
                data: null,
            });
        } catch (error) {
            // Handle any errors
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'Failed to logout user',
                data: null,
            });
        }
    }

    /**
     *  Controller for the forgotPassword route (API)
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */

    public static async forgotPassword(req: any, res: any, next: any) {
        let user;
        try {

            // check if requiredFields
            const requiredFields = ['email'];
            const missingFields = await UtilsForm.checkMissingField(req, requiredFields)

            if (missingFields.length > 0) {
                return UtilsResponse.missingFieldResponse(res, missingFields)
            }
            const email = req.body.email.toLowerCase()

            // Get user with email
            user = "Trouve l'user avec son email"
            // Return response if user does not exist
            if (!user) {
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Invalid User',
                    data: { errors: [{ msg: "errorInvalidEmail" }] },
                });
            }

            const token = UtilsFunction.generateToken()
            const link = `${process.env.APP_URL}` + "/auth/reset-password?token=" + token
            console.log(token)

            //Update the user informations
            const isModify = "Mettre a jours le token en base de donné";

            // check if user is modify
            if (isModify) {
                await "Trouver un moyen d'envoyer un email avec le link"

                return UtilsResponse.response(res, {
                    statusCode: 200,
                    message: 'forgort password action pass successfully',
                    data: null,
                });

            } else {
                return UtilsResponse.response(res, {
                    statusCode: 400,
                    message: 'send email fail',
                    data: null,
                });
            }
        } catch (error) {
            console.log(error)
            return UtilsResponse.response(res, {
                statusCode: 400,
                message: 'send email fail',
                data: null,
            });
        }
    }

    /**
     * Controller for the resetPassword route (API)
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */

    public static async resetPassword(req: any, res: any, next: any) {
        try {
            // check if requiredFields
            const requiredFields = ['password', 'confirmPassword', 'token'];
            const missingFields = await UtilsForm.checkMissingField(req, requiredFields)

            if (missingFields.length > 0) {
                return UtilsResponse.missingFieldResponse(res, missingFields)
            }

            const { password, confirmPassword, token } = req.body

            // check password condition
            const errors = await UtilsForm.checkPasswordCondition(password, confirmPassword)

            // return error if password condition not pass
            if (errors.length > 0) {
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Passwords do not match',
                    data: { errors },
                });
            }

            const isValidResetToken = "Check si le reset token est bon"

            if (!isValidResetToken) {
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Invalid token',
                    data: null,
                });
            }
            // Hash the password
            const passwordHash = await bcrypt.hash(password, 10);
            let userIsModify = "Mettre à jours le mot de passe ou il y à le token, et enlever le token de la base de donné"

            // check if user is modify
            if (userIsModify) {

                return UtilsResponse.response(res, {
                    statusCode: 200,
                    message: 'Succes to update password',
                    data: null,
                });

            } else {
                return UtilsResponse.response(res, {
                    statusCode: 400,
                    message: 'Failed to update user password',
                    data: null,
                });
            }
        } catch (error) {
            console.log(error)
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'Failed to update user password',
                data: null,
            });
        }
    }

    /**
     * Controller for the getresetPassword route (API)
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */

    public static async getResetPassword(req: any, res: any, next: any) {
        try {
            // check if requiredFields

            const requiredFields = ['passwordResetToken'];
            const missingFields = await UtilsForm.checkMissingField(req, requiredFields)
            if (missingFields.length > 0) {
                return UtilsResponse.missingFieldResponse(res, missingFields)
            }

            const { passwordResetToken } = req.body
            const user = await User.getUserByToken(passwordResetToken);
            // const user = "Trouver l'utilisateur avec ce token"

            if (user) {

                return UtilsResponse.response(res, {
                    statusCode: 200,
                    message: 'Valid token',
                    data: { isValidToken: true },
                });
            } else {
                return UtilsResponse.response(res, {
                    statusCode: 200,
                    message: 'inValid token',
                    data: { isValidToken: false },
                });
            }

        } catch (error) {
            console.log(error)
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'Failed to check token',
                data: null,
            });
        }
    }
}