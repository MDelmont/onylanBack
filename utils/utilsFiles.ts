import { User } from "@prisma/client";
import fs from 'fs';
import path from 'path';
export class UtilsFiles {
    /**
     * 
     * @param {string} 
     * @returns 
     */
    public static async transformPictureUrl(pathImg:string) {

        try {
   

            // Ajoutez le type pour inclure la propriété 'file'
        
           
            if (pathImg) {
                const extention = path.extname(pathImg).slice(1).toLowerCase();
                const filePath = path.resolve(pathImg); // Assuming pictureUrl is a relative or absolute path to the image file
                const imageFile = fs.readFileSync(filePath);
                const mimeType = extention === 'jpg' ? 'jpeg' : extention;
                const fileUrlBase64:string = `data:image/${mimeType};base64,` + imageFile.toString('base64'); // Convert image file to base64 string
                return fileUrlBase64

            }
            return null
            
        } catch (error) {
            throw error
        }

    }
}
