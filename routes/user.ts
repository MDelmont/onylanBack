
import express from 'express';
import { UserCtrl } from '../controller/user';
import {authMiddleware,isAdminMiddleware,getRoleOfUserAuthMiddleware} from '../middleware/authMiddleware'
import { uploadImage } from '../middleware/uploadFiles';
export const user = express.Router();



user.get('/invitation/:invitToken', UserCtrl.getInvitation)
user.delete('/invitation/:invitationId', isAdminMiddleware,UserCtrl.deleteInvitaton)
user.get('/invitations', isAdminMiddleware,UserCtrl.getInvitations)
user.get('/userAuth',authMiddleware, UserCtrl.getUserAuth)
user.get('/isAdmin',authMiddleware, UserCtrl.getIsAdminUser)
user.get('/isAuth',authMiddleware, UserCtrl.getIsAuthUser)
user.post('/invit',authMiddleware,isAdminMiddleware, UserCtrl.createInvitation)
user.get('/:userId',authMiddleware, UserCtrl.getUserById)
user.put('/',authMiddleware,uploadImage,UserCtrl.updateUser)
user.get('/',authMiddleware,getRoleOfUserAuthMiddleware,UserCtrl.getUsers)
