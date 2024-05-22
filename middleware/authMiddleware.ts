
import { UtilsResponse } from '../utils/utilsApi';
import { User } from '../model/user';
import jwt from 'jsonwebtoken';

const secretKey: any = process.env.SECRET_KEY_JWT_AUTH;
/***
 * authMiddleware is a fonction midleware for check if user authenticate 
 */
export async function authMiddleware(req: any, res: any, next: any) {

    // Get the token from the request headers
    const token = req.cookies['token']

    // Check if there is a token
    if (!token) {
        const ret = {
            statusCode: 401,
            message: 'Authorization denied',
            data: null
        }
        return UtilsResponse.response(res, ret)
    }

    try {
        // Verify the token with jwt

        const decoded = jwt.verify(token, secretKey);

        // add user id to the req auth
        if (typeof (decoded) === 'string') {
            req.auth = {
                userId: decoded
            }
        }
        else {
            req.auth = {
                userId: decoded.userId
            };
        }
     
        next();
    } catch (error) {
        console.error('Error in authMiddleware')
        console.error(error)
        const ret = {
            statusCode: 401,
            message: 'Token is not valid',
            data: null
        }
        return UtilsResponse.response(res, ret)
    }
};


export async function isAdminMiddleware(req: any, res: any, next: any) {
    console.log('start isAdminMiddleware')
    // Get the token from the request headers
    const token = req.cookies['token']

    // Check if there is a token
    if (!token) {
        const ret = {
            statusCode: 401,
            message: 'Authorization denied',
            data: null
        }
        return UtilsResponse.response(res, ret)
    }

    try {
        // Verify the token with jwt
        let userId:string;
        const decoded = jwt.verify(token, secretKey);
        // add user id to the req auth
        if (typeof (decoded) === 'string') {
            userId=decoded
        }else {
            userId= decoded.userId
        }
        
        req.auth = {
            userId
        }
        const user = await User.getUserById(parseInt(userId))
        if(!user?.isAdmin){
            UtilsResponse.response(res, {
                statusCode: 401,
                message: 'Not Admin User',
                data: null
            })
        }
        next();
        
    } catch (error) {
        console.error('Error in isAdminMiddleware')
        console.error(error)
        const ret = {
            statusCode: 401,
            message: 'Token is not valid',
            data: null
        }
        return UtilsResponse.response(res, ret)
    }
};


export async function goodInviteToken(req: any, res: any, next: any) {
    console.log('start goodInviteToken')
    // Get the token from the request headers
    const token = req.params.token

    // Check if there is a token
    if (!token) {
        const ret = {
            statusCode: 401,
            message: 'Authorization denied',
            data: null
        }
        return UtilsResponse.response(res, ret)
    }

    try {
        // Verify the token with jwt
        let userId:string;
        const decoded = jwt.verify(token, secretKey);
        // add user id to the req auth
        if (typeof (decoded) === 'string') {
            userId=decoded
        }else {
            userId= decoded.userId
        }
        
        req.auth = {
            userId
        }
        const user = await User.getUserById(parseInt(userId))
        if(!user?.isAdmin){
            UtilsResponse.response(res, {
                statusCode: 401,
                message: 'Not Admin User',
                data: null
            })
        }
        next();
        
    } catch (error) {
        console.error('Error in goodInviteToken')
        console.error(error)
        const ret = {
            statusCode: 401,
            message: 'Token is not valid',
            data: null
        }
        return UtilsResponse.response(res, ret)
    }
};