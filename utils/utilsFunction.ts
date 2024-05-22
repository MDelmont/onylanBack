const fs = require('fs');
export class UtilsFunction {
    public static async generateToken() {
        let token = ''
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for(let i = 0; i < 18; i++) {
            token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return token
    }



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