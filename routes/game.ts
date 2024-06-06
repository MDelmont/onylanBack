
import express from 'express';
import { UserCtrl } from '../controller/user';
import { authMiddleware, isAdminMiddleware } from '../middleware/authMiddleware'
import {uploadImage} from '../middleware/uploadFiles'
import { GameCtrl } from '../controller/game';
import { ModeCtrl } from '../controller/mode';
export const game = express.Router();

game.post('/note/:gameId',authMiddleware,GameCtrl.updateGameNote)
game.get('/:gameId', authMiddleware, GameCtrl.getGameById)
game.patch('/:gameId', isAdminMiddleware, uploadImage, GameCtrl.updateGame)
game.delete('/:gameId', isAdminMiddleware, GameCtrl.deleteGame)
game.get('/', authMiddleware, GameCtrl.getGames)
game.post('/', authMiddleware, uploadImage, GameCtrl.createGame)


// user.get('/userAuth', authMiddleware, UserCtrl.getUserAuth)

// user.get('/isAdmin', authMiddleware, UserCtrl.getIsAdminUser)
// user.get('/isAuth', authMiddleware, UserCtrl.getIsAuthUser)
// user.get('/invitation/:invitToken', UserCtrl.getInvitation)
// user.get('/invitations', isAdminMiddleware, UserCtrl.getInvitations)
// user.delete('/invitation/:invitationId', isAdminMiddleware, UserCtrl.deleteInvitaton)
// user.post('/invit', authMiddleware, isAdminMiddleware, UserCtrl.createInvitation)