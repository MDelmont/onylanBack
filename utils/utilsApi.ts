
export class UtilsResponse {
    public static  async response(res: any, ret: any) {
        return res.status(ret.statusCode).json({ message: ret.message, data: ret.data });
    }

    public static  async missingFieldResponse(res: any, missingFields: string[]) {
        return UtilsResponse.response(res, {
            statusCode: 401,
            message: `Required information ${missingFields.join(', ')} is missing`,
            data: { requiredMissing: missingFields, errors: [{ msg: "errorMissingData" }] },
        })
    }

    public static async loginPasswordInvalidResponse(res: any) {
        return UtilsResponse.response(res, {
            statusCode: 401,
            message: 'Login/password invalid',
            data: null,
        })
    }

    public static async notGoodScopeResponse(res: any) {
        return UtilsResponse.response(res, {
            statusCode: 401,
            message: 'Access denied',
            data: null,
        })
    }

    public static async internalErrorResponse(res: any, functionName: string) {
        return UtilsResponse.response(res, {
            statusCode: 500,
            message: 'internal server error',
            data: { function: functionName },
        })
    }

    public static async uploadRestriction(res:any,typeOfFile:string,error:any=null) {
        return UtilsResponse.response(res, {
            statusCode: 401,
            message: 'not allow upload this file',
            data: {typeOfFile,error},
          });
    }
}
