import { User } from "@prisma/client";
import fs from 'fs';
import path from 'path';
export class UtilsUser {
    /**
     * 
     * @param {User} user
     * @returns 
     */
    public static async filtredUser(user: User) {

        try {
            const { password, isAdmin, pictureUrl, ...userFiltred } = user

            // Ajoutez le type pour inclure la propriété 'file'
            const userFiltredWithFile: typeof userFiltred & { file?: string } = userFiltred;

            if (pictureUrl) {
                const extention = path.extname(pictureUrl).slice(1).toLowerCase();
                const filePath = path.resolve(pictureUrl); // Assuming pictureUrl is a relative or absolute path to the image file
                const imageFile = fs.readFileSync(filePath);
                const mimeType = extention === 'jpg' ? 'jpeg' : extention;
                userFiltredWithFile.file = `data:image/${mimeType};base64,` + imageFile.toString('base64'); // Convert image file to base64 string

            }
            return userFiltredWithFile
        } catch (error) {
            throw error
        }

    }
}
