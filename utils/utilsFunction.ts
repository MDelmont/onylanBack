const fs = require('fs');
export class UtilsFunction {
    
    /**
     * Generates a random token of 18 characters length.
     * The token is generated from a string of characters composed of all uppercase and lowercase letters and all numbers.
     * @returns {string} The generated token.
     */
    public static async generateToken() {
        let token = ''
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for(let i = 0; i < 18; i++) {
            token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return token
    }

    /**
     * Deletes a file located at the given path.
     * @param {string} filePath - The path of the file to delete.
     * @returns {Promise<void>} - A promise that resolves when the file has been deleted.
     */
    public static async deleteFile(filePath:string) {
        fs.unlink(filePath, (err:any) => {
            if (err) {
                console.error(`Erreur lors de la suppression du fichier : ${err}`);
                return;
            }
            console.log('Le fichier a été supprimé avec succès.');
        });
    }
}