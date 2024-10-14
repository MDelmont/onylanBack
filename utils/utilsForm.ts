import { constFormulaire } from "../config/formConfig";

export class UtilsForm {

    /**
     * Check if all required fields are present in the request body
     * @param {Request} req - The request object
     * @param {string[]} requiredFields - The list of required fields
     * @returns {Promise<string[]>} - A promise with a list of missing fields
     */
    public static async checkMissingField(req: Request, requiredFields: string[]): Promise<string[]> {
        const missingFields = [];
        const body: any = req.body;
        if (!body || typeof body !== 'object') {
            return requiredFields; // All fields are missing if the body is missing or not an object
        }
        for (const field of requiredFields) {
            if (body[field] === null || body[field] === undefined || body[field] === "") {
                missingFields.push(field);
            }
        }
        return missingFields

    };

    /**
    * Check if the password respect condition for register
    * @param {string} password 
    * @param {string} confirmPassword 
    */
    public static async checkPasswordCondition(password: string, confirmPassword: string): Promise<string[]> {
        let errors: string[] = [];

        const conditions = [
            { key: 'passwordSize', condition: password.length < constFormulaire.passwordSize },
            { key: 'majRegex', condition: !constFormulaire.majRegex.test(password) },
            { key: 'minRegex', condition: !constFormulaire.minRegex.test(password) },
            { key: 'digitRegex', condition: !constFormulaire.digitRegex.test(password) },
            { key: 'specialCharRegex', condition: !constFormulaire.specialCharRegex.test(password) },
            { key: 'samePassword', condition: !(password == confirmPassword && password.length > 0 && confirmPassword.length > 0) },
        ];

        conditions.map(({ key, condition }) => {
            if (condition) {
                errors.push(key);
            }
        })
        return errors
    }

    /**
     * Check if the email respect condition for register
     * @param {string} email the email to check
     * @returns {Promise<string[]>} a list of string key of the condition that is not respected
     */
    public static async checkEmailCondition(email: string): Promise<string[]> {
        let errors: string[] = [];

        const conditions = [
            { key: 'regexEmail', condition: !constFormulaire.regexEmail.test(email) },
        ];

        conditions.map(({ key, condition }) => {
            if (condition) {
                errors.push(key);
            }
        })
        return errors
    }
}
