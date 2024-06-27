
import express from 'express';
import { authMiddleware, isAdminMiddleware } from '../middleware/authMiddleware'
import { ModeCtrl } from '../controller/mode';
export const mode = express.Router();

mode.get('/game/:gameId', authMiddleware, ModeCtrl.getModesByGame)
mode.get('/:modeId', authMiddleware, ModeCtrl.getModeById)
mode.patch('/:modeId', isAdminMiddleware, ModeCtrl.updateMode)
mode.delete('/:modeId', isAdminMiddleware, ModeCtrl.deleteMode)
mode.get('/', authMiddleware, ModeCtrl.getModes)
mode.post('/', authMiddleware, ModeCtrl.createMode)
