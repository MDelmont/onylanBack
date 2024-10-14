
export class UtilsResponse {
    public static  async response(res: any, ret: any) {
        return res.status(ret.statusCode).json({ message: ret.message, data: ret.data });
    }

/*************  ✨ Codeium Command ⭐  *************/
    /**
     * Send a response with a 401 status code, indicating that a required field is missing
     * @param {object} res - The response object
     * @param {string[]} missingFields - The list of missing fields
     * @returns {Promise<object>} - The response object
     */
/******  1f49fbba-f3bc-4a9c-8221-d7020a3d5f8e  *******/
    public static  async missingFieldResponse(res: any, missingFields: string[]) {
        return UtilsResponse.response(res, {
            statusCode: 401,
            message: `Required information ${missingFields.join(', ')} is missing`,
            data: { requiredMissing: missingFields, errors: [{ msg: "errorMissingData" }] },
        })
    }


    /**
     * Send a response with a 401 status code, indicating that the login and password were invalid
     * @param {object} res - The response object
     * @returns {Promise<object>} - The response object
     */
    public static async loginPasswordInvalidResponse(res: any) {
        return UtilsResponse.response(res, {
            statusCode: 401,
            message: 'Login/password invalid',
            data: null,
        })
    }

    /**
     * Send a response with a 401 status code, indicating that the user is not allowed to access the requested resource
     * @param {object} res - The response object
     * @returns {Promise<object>} - The response object
     */
    public static async notGoodScopeResponse(res: any) {
        return UtilsResponse.response(res, {
            statusCode: 401,
            message: 'Access denied',
            data: null,
        })
    }



    /**
     * Send a response with a 500 status code, indicating that an internal error was encountered
     * @param {object} res - The response object
     * @param {string} functionName - The name of the function that encountered the error
     * @returns {Promise<object>} - The response object
     */
    public static async internalErrorResponse(res: any, functionName: string) {
        return UtilsResponse.response(res, {
            statusCode: 500,
            message: 'internal server error',
            data: { function: functionName },
        })
    }


    /**
     * Send a response with a 401 status code, indicating that the file is not allow to be uploaded
     * @param {object} res - The response object
     * @param {string} typeOfFile - The type of file that is not allowed to be uploaded
     * @param {object} [error=null] - The error encountered while trying to upload the file
     * @returns {Promise<object>} - The response object
     */
    public static async uploadRestriction(res:any,typeOfFile:string,error:any=null) {
        return UtilsResponse.response(res, {
            statusCode: 401,
            message: 'not allow upload this file',
            data: {typeOfFile,error},
          });
    }
}
