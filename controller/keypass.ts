
import { UtilsResponse } from '../utils/utilsApi';
import { UtilsForm } from '../utils/utilsForm';
import { UtilsFunction } from '../utils/utilsFunction';
import { UtilsFiles } from '../utils/utilsFiles';
import { PrismaClient } from "@prisma/client";
import { Game } from '../model/game';
import { UserGame } from '../model/UserGame';
import { gameConfig } from '../config/gameConfig';
import { UtilsEncrypt } from '../utils/utilsEncrypt';
const prisma = new PrismaClient();

export class KeyPassCtrl {
    constructor() {
    }

/**
 * getAsk
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @description This function will handle the ask route and return a response based on the ask parameter.
 * @returns {Promise} - A promise with the response object
 */
    public static async getAsk(req: any, res: any, next: any) {
        try {
            const ask = req.body.ask;
            const encrypt = new UtilsEncrypt();
            const result = await encrypt.encrypt(ask);
            console.log(result);

            let response = "";
            switch (result) {

                case '0j091ybSk4GPCOG06ODyMw==':
                case 'yXJSXGshfdSVcJonlUXrRA==':
                case 'QduhJ9dlMj169bLzUFzbFA==':
                    response = "Outre le nom des Onylans, il y a 2 indices dans la vidéo.";
                    break;
                case '/XbaikDhwGye8vgyGni/dw==':
                case '7XdVt1NtZAZtgQr5IZqaKQ==':
                    response = "Pour le moment pas d'indice de cacher sur le site, réessaie plus tard il pourra y en avoir à l'avenir.";
                    break;
                case 'kRj5DzUPO8migxyziI36vQ==':
                    response = "Tu peux en effet trouver 3 indices sur cette plateforme.";
                    break;
                case 'BNWvaYjswVgACJQssZ6ECQ==':
                case 'yA2JRFah3EAyBL+VQ+MZEA==':
                case 'dsjOeuo3a+ukeomiiV9rZg==':
                    response = "Il y a 3 indices dans la musique.";
                    break;
                case 'BcfA2johpU5iBebOPkHYFg==':
                    response = "Pas d'indice pour ce terme, pas mal on déjà fait le lien.";
                    break;
                case 'EQzj1z3i2yb8xhrTiPI2+A==':
                    response = "Son utilisation n'est pas anecdotique.";
                    break;
                case 'FhGXgF/8XjuMY3AcCEwPTw==':
                case 'WdFijVqdDBzjD/7DKq3XYw==':
                    response = "Cette fois vous êtes enfin arriver au bout de la première enigme. Cet indice est le PREMIER qui vous permettra de trouver le mot clé et ainsi gagner la récompense. Pour connaitre sa signification, transmettre à Ony le code suivant 'CzYOyAnsJW'";
                    break;
                case 'Bi/T7jyqKiPiRgBL/el0JQ==':
                    response = "Ahahhah t'es con, t'as vraiment cru que ce serait aussi simple ! Allez ciao nullos ! Je déconne pour avoir la bonne traduction il suffit de mettre le premier mot au féminin (même si ce nom ne s'écrit pas au féminin, imagine que c'est possible... pis si t'es trop con vient pleurnicher en DM), veuillez entrer ce mot afin d'avoir un nouvel indice.";
                    break;
                case 'Lc53u45rTbEYliFW3IA+IA==':
                    response = "Pour avoir un indice, j'ai besoin du mot complet... Oui ce n'est qu'une partie du 1er indice, cherchez bien d'autres joueurs ont déjà trouvé le mot complet.";
                    break;
                case 'nYF1t13GGjsamYDRr+7wxA==':
                case 'f85AHs8wsvDYdXhoIrs0cA==':
                    response = "Bravo c'est une bonne traduction, continuez vous êtes sur la bonne voie.";
                    break;
                case 'vNfRzXZZcfNZCgtfxsgxFA==':
                case 'QbWGiMJXxbb9WUIyFghUeU2LZv09386d3RrUlTrVCNU=':
                    response = "Raté.";
                    break;
                case 'pVG2xAnojH3nE3rjkskJsw==':
                    response = "Bravo vous avez trouvez la bonne licence maintenant, il faut trouver le bon jeu.";
                    break;
                case 'LEoLMIaN6gC7pFASglESUQ==':
                    response = "Non ce n'est pas un indice mais tu es sur la bonne voie.";
                    break;
                case 'Wwzwvaz7ZbKlCCycWJBTAA==':
                    response = "Je suis en effet un grand fan de ce concept, garde cela en tête cela pourra t'être utile pour trouver d'autres indices.";
                    break;
                case '4CCAcG1cmgBPMGrNBQySqQ==':
                    response = "Bravo c'est une bonne traduction, si vous avez déjà trouvé la première traduction, il ne vous reste plus qu'à rentrer le mot obtenu sans espace.";
                    break;
                case 'C3lf0A6JZ8M/qOWvp/czrg==':
                case '5NdVzZpwuAHhmKbGjTudow==':
                    response = "C'est un indice en soit, maintenant si tu veux connaitre le nombre d'indice dans la musique, tape 'musique'. En tout cas pour ta proposition: Transmettre à Ony le code suivant 'K7jjn0cIpY'";
                    break;
                case '3ydILrgKCAal30bpsSvthLooFHr9Vznkf7CwKSUtvN5SQnoPp/VvOLtnYEG5hsqG':
                    response = "Bien joué, vous n'avez qu'à faire le rapprochement pour vous rapprocher de l'indice.";
                    break;
                case '4NlQTm8bcP3O6gNRgg44Tg==':
                case 'a3doxdZneSBHOlPusMlzDQ==':
                case '8MDcurNw9fv0BR7FZreyTw==':
                case 'hiSr0grv9kqJPP2eqEM6147YQR9QKKSMNaZBTO7pPGE=':
                    response = "Transmettez à ony le code suivant : 'R1IS3O175z'";
                    break;
                case 'ZxSVs+DDjtW3Ftd2DZEZlA==':
                    response = "Transmettre à Ony le code suivant 'YaBjTZJEI7'";
                    break;
                case 'MnGYf/MSBmIvgW0aQeuPHQ==':
                    response = "Transmettre à Ony le code suivant 'WYNMPQmV2E'";
                    break;
                case 'ebwyqORBqj2CjXEQubBVVQ==':
                    response = "Transmettez à ony le code suivant : 'vDcxiHB8pE'";
                    break;
                case 'zscw2OxVKrCXbuv7xGjCHw==':
                case 'aychrbSQ8hGmi9Wb6v8vPK9LDCD4uT7www6YvevRVbI=':
                    response = "Transmettre à Ony le code suivant 'xAg5TGJHAz'";
                    break;
                case '1c1s8ESlUxHl3URt+E7eSQ==':
                case 'ZqtXaxI7RNWdG6W7T2v4HA==':
                    response = "Transmettre à Ony le code suivant 'hsANvxgKsQ'";
                    break;
                case '52/REYLYK8q2UZbRi/IROw==':
                    response = "Bravo vous avez trouvé le premier indice caché dans la vidéo ! Si vous voulez de l'aide pour comprendre la signification de ce mot, transmettez à ony le code suivant : '2xJtktB536'";
                    break;
                case '2fi9+e2x6RymOGm43KPriw==':
                    response = "Transmettre à Ony le code suivant '9t7mJBQGKt'";
                    break;
                case 'ug4SFW9N/VHRXgqlh3GjRA==':
                case 'jCNW+OzabIYazVgZifApCg==':
                    response = "Transmettez à ony le code suivant : '8CweMb0ANS'";
                    break;
                case 'poFMLetIVxaEbO1URAEqKecpzcqhPKWDcoO9rwG4jW4=':
                    response = "Transmettre à Ony le code suivant 'uxTEe1nNuH'";
                    break;
                case 'KGfw2BonSL//+UqOwHyL4w==':
                    response = "Bravo vous êtes venu à bout de la première énigme... enfin presque... Veuillez transmettre à ony le code suivant 'D3SzcXIkMb'";
                    break;
                case '3ghofHeVDy0dVDJ/2kScrQ==':
                    response = "Transmettre à Ony le code suivant 'JMo2jXaNAQ'";
                    break;
                case 'AinFF4Y59M+4H4uXIyYObA==':
                case 'qr9vb62nPD3TFfOD9sUeYg==':
                case 'IEOm/3Ec/C05jiTVsOQwkQ==':
                case 'egu3lddxIT0A3AJ3s8XxSA==':
                case 'Dq7xQf0zFJEzfLLGEMWkzw==':
                case 'Qq+o1uXFizGhg86CUz5D+w==':
                case 'Z7AuEmejWXo7jtO39bcVng==':
                    response = "Transmettre à Ony le code suivant 'TKTOJ9V7AL'";
                    break;

                default:
                    response = "Cette proposition ne fait pas partie de mon vocabulaire, veuillez essayer autre chose.";
            }
            return UtilsResponse.response(res, {
                statusCode: 200,
                message: 'ask successfully',
                data: response,
            })

        } catch (error) {
            // Handle any errors
            console.error('error in getAsk', error);
            return UtilsResponse.response(res, {
                statusCode: 500,
                message: 'fail to ask',
                data: null,
            });
        }
    }
}