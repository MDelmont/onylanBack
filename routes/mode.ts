
import express from 'express';
import { authMiddleware, isAdminMiddleware } from '../middleware/authMiddleware'
import { ModeCtrl } from '../controller/mode';
export const mode = express.Router();


mode.get('/:modeId', authMiddleware, ModeCtrl.getModeById)
mode.get('/', authMiddleware, ModeCtrl.getModes)
mode.post('/', authMiddleware, ModeCtrl.createMode)
mode.patch('/:modeId', isAdminMiddleware, ModeCtrl.updateMode)