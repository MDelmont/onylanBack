
import { UtilsResponse } from '../utils/utilsApi';
import { UtilsForm } from '../utils/utilsForm';
import { UtilsFunction } from '../utils/utilsFunction';
import { UtilsGame } from '../utils/utilsGame';
import { PrismaClient } from "@prisma/client";
import { Game } from '../model/game';
const prisma = new PrismaClient();

export class GameCtrl {
    constructor() {
    }

    public static async getGameById(req: any, res: any, next: any) {
        try {
            const gameId = req.params.gameId;
            const intGameId: number = +gameId;
            const game = await Game.getGameByID(intGameId);
            if (!game) {
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Game not exist',
                    data: null,
                });
            }

            // const userFiltredWithFile = await UtilsGame.filtredGame(game);
            let filtredGame;
            if (game.id) {
                // filtredGame = userFiltredWithFile;
            }
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'getGameById successfully',
                data: game,
            })

        } catch (error) {
            // Handle any errors
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'fail to getGameById',
                data: null,
            });
        }

    }
    public static async getGames(req: any, res: any, next: any) {
        try {
            const games = await Game.getGames();
            if (!games || games.length === 0) {
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Games not exist',
                    data: null,
                });
            }
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'getGames successfully',
                data: games,
            })

        } catch (error) {
            // Handle any errors
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'fail to getGames',
                data: null,
            });
        }

    }

    public static async createGame(req: any, res: any, next: any) {
        let path = null;
        if (req.file) {
            path = req.file.path;
        }
        try {
            // check if requiredFields
            const requiredFields = ['name', 'categorie', 'description', 'downloadDescription'];
            const missingFields = await UtilsForm.checkMissingField(req, requiredFields);

            if (missingFields.length > 0) {
                if (path) {
                    UtilsFunction.deleteFile(path);
                }
                return UtilsResponse.missingFieldResponse(res, missingFields);
            }
            let { name, categorie, description, downloadDescription } = req.body;

            const allErrors: string[] = [];

            const existingGame = await Game.getGameByParams({ name });
            if (existingGame && existingGame.length > 0) {
                console.log('Game already exists with this name', name);
                allErrors.push('errorGameAlreadyExists');
            }
            if (allErrors.length > 0) {
                console.log(allErrors);
                if (path) {
                    UtilsFunction.deleteFile(path);
                }
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Invalid data for register',
                    data: { errors: allErrors },
                });
            }

            const gameCreate = await Game.createGame({ name, categorie, pictureUrl: path, description, downloadDescription });
            if (gameCreate) {
                console.log('Game registered successfully')
                return UtilsResponse.response(res, {
                    statusCode: 200,
                    message: 'Game registered successfully',
                    data: null,
                });
            } else {
                if (path) {
                    UtilsFunction.deleteFile(path)
                }
                return UtilsResponse.response(res, {
                    statusCode: 400,
                    message: 'Failed to register',
                    data: { name: req.body.name },
                });
            }
        } catch (error) {
            // Handle any errors
            console.log(error);
            if (path) {
                UtilsFunction.deleteFile(path);
            }
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'Failed to register game',
                data: { name: req.body.name },
            });
        }
    };

    public static async updateGame(req: any, res: any, next: any) {
        let path = null;
        if (req.file) {
            path = req.file.path;
        }
        try {
            const gameId = req.params.gameId;
            const intGameId: number = +gameId
            // check if requiredFields
            const requiredFields = ['name', 'categorie', 'description', 'downloadDescription', 'pictureUrl'];
            const missingFields = await UtilsForm.checkMissingField(req, requiredFields);

            if (missingFields.length > 0) {
                if (path) {
                    UtilsFunction.deleteFile(path);
                }
                return UtilsResponse.missingFieldResponse(res, missingFields);
            }
            let { name, categorie, description, downloadDescription, pictureUrl } = req.body;

            const allErrors: string[] = [];
            
            const existingGame = await Game.getGameByParams({ name });
            if (existingGame && existingGame.length > 0 && (existingGame.length === 1 && existingGame[0].id !== intGameId)) {
                console.log('Game already exists with this name', name);
                allErrors.push('errorGameAlreadyExists');
            }
            if (allErrors.length > 0) {
                console.log(allErrors);
                if (path) {
                    UtilsFunction.deleteFile(path);
                }
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Invalid data for register',
                    data: { errors: allErrors },
                });
            }

            const gameCreate = await Game.updateGame(intGameId,{ name, categorie, pictureUrl, description, downloadDescription });
            if (gameCreate) {
                console.log('Game registered successfully');
                return UtilsResponse.response(res, {
                    statusCode: 200,
                    message: 'Game registered successfully',
                    data: null,
                });
            } else {
                if (path) {
                    UtilsFunction.deleteFile(path);
                }
                return UtilsResponse.response(res, {
                    statusCode: 400,
                    message: 'Failed to register',
                    data: { name: req.body.name },
                });
            }
        } catch (error) {
            // Handle any errors
            console.log(error);
            if (path) {
                UtilsFunction.deleteFile(path);
            }
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'Failed to register game',
                data: { name: req.body.name },
            });
        }
    };

}