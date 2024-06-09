import { AuthCtrl } from '../controller/auth';
import express from 'express';
export const auth = express.Router();
import {uploadImage} from '../middleware/uploadFiles'
import {authMiddleware} from '../middleware/authMiddleware'

auth.post("/register/:token", uploadImage, AuthCtrl.register);
auth.post('/reset-password/:token', AuthCtrl.resetPasswordToken);
auth.get('/reset-password/:token', AuthCtrl.getResetPasswordToken);
auth.post('/reset-password',authMiddleware, AuthCtrl.resetPassword);
auth.post("/forgot-password", AuthCtrl.forgotPassword);
auth.get("/logout", AuthCtrl.logout);
auth.post("/login", AuthCtrl.login);