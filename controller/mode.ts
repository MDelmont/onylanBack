
import { UtilsResponse } from '../utils/utilsApi';
import { UtilsForm } from '../utils/utilsForm';
import { UtilsFunction } from '../utils/utilsFunction';
import { PrismaClient } from "@prisma/client";
import { Mode } from '../model/mode';
const prisma = new PrismaClient();

export class ModeCtrl {
    constructor() {
    }

    /**
     * Get a mode by its id
     * @param {object} req - request object
     * @param {object} res - response object
     * @param {function} next - next function
     * @returns {Promise<object>} - response object with mode
     */
    public static async getModeById(req: any, res: any, next: any) {
        try {
            const modeId = req.params.modeId;
            const intModeId: number = +modeId;
            const mode = await Mode.getModeByID(intModeId);
            if (!mode) {
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'mode not exist',
                    data: null,
                });
            }

            // const userFiltredWithFile = await UtilsGame.filtredGame(game);
            // let filtredGame;
            if (mode.id) {
                // filtredGame = userFiltredWithFile;
            }
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'getModeById successfully',
                data: mode,
            })

        } catch (error) {
            // Handle any errors
            console.error('error in getModeById', error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'fail to getGameById',
                data: null,
            });
        }

    }

    /**
     * Get all modes
     * @param {object} req - request object
     * @param {object} res - response object
     * @param {function} next - next function
     * @returns {Promise<object>} - response object with all modes
     */
    public static async getModes(req: any, res: any, next: any) {
        try {
            const modes = await Mode.getModes();
            if (!modes || modes.length === 0) {
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Modes not exist',
                    data: null,
                });
            }
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'getModes successfully',
                data: modes,
            })

        } catch (error) {
            // Handle any errors
            console.error('error in getModes', error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'fail to getModes',
                data: null,
            });
        }

    }

    /**
     * Get all modes for a game
     * @param {object} req - request object
     * @param {object} res - response object
     * @param {function} next - next function
     * @returns {Promise<object>} - response object with all modes for the game
     */
    public static async getModesByGame(req: any, res: any, next: any) {
        try {
            const gameId = req.params.gameId;
            console.log(gameId)
            const modes = await Mode.getModeByParams({idGame:parseInt(gameId)});
            console.log(modes)
            if (!modes || modes.length === 0) {
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Modes not exist',
                    data: null,
                });
            }
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'getModes successfully',
                data: modes,
            })

        } catch (error) {
            // Handle any errors
            console.error('error in getModesByGame', error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'fail to getModes',
                data: null,
            });
        }

    }

        /**
         * Create a new mode
         * @param {object} req - request object
         * @param {object} res - response object
         * @param {function} next - next function
         * @returns {Promise<object>} - response object with mode id
         */
    public static async createMode(req: any, res: any, next: any) {
        let path = null;
        try {
            // check if requiredFields
            const requiredFields = ['name', 'description', 'installationGuide', 'scoreRules', 'idGame'];
            const missingFields = await UtilsForm.checkMissingField(req, requiredFields);

            if (missingFields.length > 0) {
                return UtilsResponse.missingFieldResponse(res, missingFields);
            }
            let { name, description, installationGuide, scoreRules, idGame } = req.body;
            
            const intGameId: number = +idGame;
            idGame = intGameId;
            const allErrors: string[] = [];

            const existingMode = await Mode.getModeByParams({ name, idGame });
            if (existingMode && existingMode.length > 0) {
                console.log('Mode already exists with this name', name);
                allErrors.push('errorModeAlreadyExists');
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

            const modeCreate = await Mode.createMode({ name, installationGuide, description, scoreRules, idGame });
            if (modeCreate) {
                console.log('Mode registered successfully')
                return UtilsResponse.response(res, {
                    statusCode: 200,
                    message: 'Mode registered successfully',
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
            console.error('error in createMode', error);
            if (path) {
                UtilsFunction.deleteFile(path);
            }
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'Failed to register Mode',
                data: { name: req.body.name },
            });
        }
    };

        /**
         * Update a mode
         * @param {object} req - request object
         * @param {object} res - response object
         * @param {function} next - next function
         * @returns {Promise<object>} - response object with mode id
         */
    public static async updateMode(req: any, res: any, next: any) {
        try {
            const modeId = req.params.modeId;
            const intModeId: number = +modeId
            // check if requiredFields
            const requiredFields = ['name', 'description', 'installationGuide', 'scoreRules'];
            const missingFields = await UtilsForm.checkMissingField(req, requiredFields);

            if (missingFields.length > 0) {
                return UtilsResponse.missingFieldResponse(res, missingFields);
            }
            let { name, description, installationGuide, scoreRules} = req.body;
            const actualMode = await Mode.getModeByID(intModeId)
            const allErrors: string[] = [];
            
            const existingMode = await Mode.getModeByParams({ name, idGame:actualMode?.idGame });
            if (existingMode && existingMode.length > 0 && (existingMode.length === 1 && existingMode[0].id !== intModeId)) {
                console.log('Mode already exists with this name', name);
                allErrors.push('errorModeAlreadyExists');
            }
            if (allErrors.length > 0) {
                console.log(allErrors);
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'Invalid data for register',
                    data: { errors: allErrors },
                });
            }

            const modeCreate = await Mode.updateMode(intModeId,{ name, installationGuide, scoreRules, description });
            if (modeCreate) {
                console.log('Mode registered successfully');
                return UtilsResponse.response(res, {
                    statusCode: 200,
                    message: 'Mode registered successfully',
                    data: null,
                });
            } else {
                return UtilsResponse.response(res, {
                    statusCode: 400,
                    message: 'Failed to register',
                    data: { name: req.body.name },
                });
            }
        } catch (error) {
            // Handle any errors
            console.error('error in updateMode', error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'Failed to register Mode',
                data: { name: req.body.name },
            });
        }
    };

/**
 * Delete a mode
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 * @returns {Promise<object>} - response object with a boolean value
 */
    public static async deleteMode(req: any, res: any, next: any) {
        console.log('start deleteMode')
        try {
            const {modeId} = req.params

            const deleteGame = await Mode.deteleMode(parseInt(modeId));
            
            if (!deleteGame){
                return UtilsResponse.response(res, {
                    statusCode: 401,
                    message: 'fail to deleteMode',
                    data: null,
                });

            }
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'deleteMode successfully',
                data: deleteGame,
            })

        } catch (error) {
            // Handle any errors
            console.error('error in deleteMode', error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'fail to deleteMode',
                data: null,
            });
        }

    }

}