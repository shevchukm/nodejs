const nodemailer = require('nodemailer');

class MailClient {

    constructor(service) {
        this.configMailServise(service)
    }

    configMailServise(service){
        this.transporter = nodemailer.createTransport(service);
    };

    generateEmailBody( {from = process.env.MAIL_BODY_FROM, subject = process.env.MAIL_BODY_SUBJECT, to, text }) {
        this.emailBody = { from, subject, to, text }
    }

    sendMail(emailBody){
        this.generateEmailBody({...emailBody});

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(this.emailBody, (error, info) => {
                error ? reject(error) : resolve(info);
            }); 
        });
    };
};

module.exports = MailClient;
