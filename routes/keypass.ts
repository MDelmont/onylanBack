
import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware'
import { KeyPassCtrl } from '../controller/keypass';
export const keypass = express.Router();

keypass.post('/', authMiddleware, KeyPassCtrl.getAsk)

