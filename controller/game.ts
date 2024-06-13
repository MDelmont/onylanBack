
import { UtilsResponse } from '../utils/utilsApi';
import { UtilsForm } from '../utils/utilsForm';
import { UtilsFunction } from '../utils/utilsFunction';
import { UtilsFiles } from '../utils/utilsFiles';
import { PrismaClient } from "@prisma/client";
import { Game } from '../model/game';
import { UserGame } from '../model/UserGame';
import { gameConfig } from '../config/gameConfig';
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
            
            const pathImgGame = game.pictureUrl
            if(pathImgGame){
                game.pictureUrl = await  UtilsFiles.transformPictureUrl(pathImgGame)
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
            const userId = req.auth.userId
            const games = await Game.getGames(userId);
            if (!games || games.length === 0) {
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Games not exist',
                    data: null,
                });
            }
            for (let game of games){
                const pathImgGame = game.pictureUrl
                if(pathImgGame){
                    game.pictureUrl = await  UtilsFiles.transformPictureUrl(pathImgGame)
                }
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
            const requiredFields = ['name', 'categorie', 'description', 'downloadDescription','price'];
            const missingFields = await UtilsForm.checkMissingField(req, requiredFields);
            console.log(path)
            if (missingFields.length > 0) {
                if (path) {
                    UtilsFunction.deleteFile(path);
                }
                return UtilsResponse.missingFieldResponse(res, missingFields);
            }
            let { name, categorie, description, downloadDescription, price } = req.body;
            
            const allErrors: string[] = [];

            if (!gameConfig.game.categorie.includes(categorie)){
                allErrors.push('errorCategorieGame');
            }
            const existingGame = await Game.getGameByParams({ name });
            if (existingGame && existingGame.length > 0) {
                console.log('Game already exists with this name', name);
                allErrors.push('errorGameAlreadyExists');
            }

            if (price && price =="" && price <0 && isNaN(price)) {
                allErrors.push('errorPriceGame');
            }

            if (allErrors.length > 0) {
                console.log(allErrors);
                if (path) {
                    UtilsFunction.deleteFile(path);
                }
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Invalid data for create game',
                    data: { errors: allErrors },
                });
            }
            const priceUpdate  : number = parseFloat(price)
            const gameCreate = await Game.createGame({ name, categorie, pictureUrl: path, description, downloadDescription, price:priceUpdate });
            if (gameCreate) {
                console.log('Game create successfully')
                return UtilsResponse.response(res, {
                    statusCode: 200,
                    message: 'Game create successfully',
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
            const requiredFields = ['name', 'categorie', 'description', 'downloadDescription','price'];
            const missingFields = await UtilsForm.checkMissingField(req, requiredFields);

            if (missingFields.length > 0) {
                if (path) {
                    UtilsFunction.deleteFile(path);
                }
                return UtilsResponse.missingFieldResponse(res, missingFields);
            }
            let { name, categorie, description, downloadDescription, pictureUrl ,price} = req.body;
            const GameArray = await Game.getGameByParams({ id: parseInt(gameId)});
            const existingGameArray = await Game.getGameByParams({ name});


            if (existingGameArray && GameArray){
                if (existingGameArray.length > 0 && GameArray.length > 0 && existingGameArray[0].id != GameArray[0].id){
                    return UtilsResponse.response(res, {
                        statusCode: 400,
                        message: 'Invalid data for create game',
                        data: { errors: ['errorGameAlreadyExists']},
                    });
                }
            }
            
            if(GameArray){
                const gameModify = GameArray[0];
                if (gameModify?.pictureUrl){
        
                        UtilsFunction.deleteFile(gameModify.pictureUrl);
                }
            }
           
            
            const allErrors: string[] = [];

            if (!gameConfig.game.categorie.includes(categorie)){
                allErrors.push('errorCategorieGame');
            }

            if (price && price =="" && price <0 && isNaN(price)) {
                allErrors.push('errorPriceGame');
            }

            if (allErrors.length > 0) {
                console.log(allErrors);
                if (path) {
                    UtilsFunction.deleteFile(path);
                }
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Invalid data for create game',
                    data: { errors: allErrors },
                });
            }
            const priceUpdate  : number = parseFloat(price)
            const gameCreate = await Game.updateGame(intGameId,{ name, categorie, pictureUrl:path, description, downloadDescription,price:priceUpdate });
            if (gameCreate) {
                console.log('Game update successfully');
                return UtilsResponse.response(res, {
                    statusCode: 200,
                    message: 'Game update successfully',
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

    public static async updateGameNote(req: any, res: any, next: any) {
        console.log('start updateGameNote')
        try {
            const userId = req.auth.userId
            const {gameId} = req.params

            const requiredFields = ['note'];
            const missingFields = await UtilsForm.checkMissingField(req, requiredFields);

            if (missingFields.length > 0) {
                return UtilsResponse.missingFieldResponse(res, missingFields);
            }

            const {note} = req.body

            
            if (isNaN(note)){
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Invalid data for updateNote',
                    data: { errors: 'notNumberNote' },
                });
            }
            let usergameNote:any;     
            const userGameFind = await UserGame.findUserGame(parseInt(userId),parseInt(gameId))
            if (!userGameFind){

                usergameNote = await UserGame.createUserGame({idUser:userId,idGame:parseInt(gameId),note:parseFloat(note)})

            } else {
                usergameNote = await UserGame.updateUserGame(userId,parseInt(gameId),parseFloat(note))
            }
          


            if (!usergameNote) {
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'User or game not exit',
                    data: null,
                });
            }
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'updateGameNote successfully',
                data: usergameNote,
            })

        } catch (error) {
            // Handle any errors
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'fail to updateGameNote',
                data: null,
            });
        }

    }

    public static async deleteGame(req: any, res: any, next: any) {
        console.log('start deleteGame')
        try {
            const userId = req.auth.userId
            const {gameId} = req.params

            const deleteGame = await Game.deteleGame(parseInt(gameId));
            console.log(deleteGame)
            
            if (!deleteGame){
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'fail to deleteGame',
                    data: null,
                });

            }
            if (deleteGame?.pictureUrl){
        
                UtilsFunction.deleteFile(deleteGame.pictureUrl);
        }
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'deleteGame successfully',
                data: deleteGame,
            })

        } catch (error) {
            // Handle any errors
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'fail to deleteGame',
                data: null,
            });
        }

    }

    public static async getGameConfig(req: any, res: any, next: any) {
        console.log('start getGameConfig')
        try {
            

            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'getGameConfig successfully',
                data: gameConfig,
            })

        } catch (error) {
            // Handle any errors
            console.log(error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'fail to getGameConfig',
                data: null,
            });
        }

    }
    

}