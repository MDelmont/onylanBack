const nodemailer = require('nodemailer');
const EMAIL_SEND_FORGETPASSWORD = process.env.EMAIL_SEND_FORGETPASSWORD;
const PASSWORD_SEND_FORGETPASSWORD = process.env.PASSWORD_SEND_FORGETPASSWORD;
const URL_FRONT = process.env.URL_FRONT;

export class UtilsEmail {
    public static async sendEmailToUserForResetPassword(email: string, token: string) {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_SEND_FORGETPASSWORD,
                pass: PASSWORD_SEND_FORGETPASSWORD
            }
        });

        const mailOptions = {
            from: EMAIL_SEND_FORGETPASSWORD,
            to: email,
            subject: 'Onylan, réinitialiser le mot de passe.',
            html: `Voici le lien pour réinitialiser le mot de passe : <br> <a href="${URL_FRONT}/resetPassword/${token}">${URL_FRONT}/resetPassword/${token}</a>`
        };

        transporter.sendMail(mailOptions, (error: Error | null, info:any) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email envoyé: ' + info.response);
        });
    }
}
