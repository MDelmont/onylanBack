import { UtilsResponse } from '../utils/utilsApi';
const multer = require('multer');
import {uploadImgConfig} from "../config/uploadConfig"

const storageImage = multer.diskStorage({
    destination: function (req:any, file:any, callback:any) {
        callback(null, 'uploads/image/')
    },
    filename: function (req:any, file:any, callback:any) {
        callback(null, Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

const uploadImageFilter = multer({ 
    storage: storageImage,
    limits: {
        fileSize: uploadImgConfig.image.maxSize
   
    },

    fileFilter: function (req:any, file:any, callback:any) {
        console.log(file)
        // check the type of file
        if (uploadImgConfig.image.mimetypes.includes(file.mimetype)) {
            // accept the file
            callback(null, true);
        } else {
            console.log('error')
            // reject the file
            let error = new Error('Wrong format of file') as Error & { code?: string };
            error.code = 'MINETYPE_OF_FILE';
            callback(error, false);
        }

    }
}).single('file');


export async function  uploadImage(req:any, res:any, next:any) {
    console.log('start uploadImage')
    try{


        uploadImageFilter(req, res, function (error:any) {
        if (error) {
            console.log(error)
            return UtilsResponse.uploadRestriction(res,'image', error.code)
        }

        next();
    });

    } catch (e) {
        console.error('error in uploadImage : ', e)
        return UtilsResponse.internalErrorResponse(res,'uploadImage')
    }
}


