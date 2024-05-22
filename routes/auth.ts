import { AuthCtrl } from '../controller/auth';
import express from 'express';
export const auth = express.Router();
import {uploadImage} from '../middleware/uploadFiles'
import {authMiddleware} from '../middleware/authMiddleware'


auth.post("/login", AuthCtrl.login);
auth.post("/register/:token", uploadImage, AuthCtrl.register);
auth.get("/logout", AuthCtrl.logout);
auth.post("/forgot-password", AuthCtrl.forgotPassword);
auth.post('/reset-password', AuthCtrl.resetPassword);
auth.get('/reset-password', AuthCtrl.getResetPassword);

