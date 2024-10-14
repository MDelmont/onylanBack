var CryptoJS = require("crypto-js/core");
CryptoJS.AES = require("crypto-js/aes");
export class UtilsEncrypt {
    
    constructor() {
    }
    readonly secretKey = '2V1mRaSohOSzyUmcLG4KIEAyKMgFYuk9';
    readonly secretIV = 'J60sAVAybbBbKYRU';
    readonly encMethod = 'aes-256-cbc';
    // readonly key = crypto.createHash('sha512').update(this.secretKey).digest('hex').substring(0, 32);
    // readonly encIv = crypto.createHash('sha512').update(this.secretIV).digest('hex').substring(0, 16);

    /**
     * Encrypts a given string
     * @param {string} data - Data to be encrypted
     * @returns {string} The encrypted data
     */
    public async encrypt(data: string) {
        const key = CryptoJS.enc.Utf8.parse(this.secretKey);
        let iv = CryptoJS.lib.WordArray.create(key.words.slice(0, 4));
        console.log("IV : " + CryptoJS.enc.Base64.stringify(iv));
      
        // Encrypt the plaintext
        const cipherText = CryptoJS.AES.encrypt(data, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
          });
        console.log(cipherText.toString());
        return cipherText.toString();
    }
}
