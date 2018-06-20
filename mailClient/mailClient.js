const nodemailer = require('nodemailer');

class MailClient {

    constructor(service) {
        this.configMailServise(service)
    }

    configMailServise(service){
        this.transporter = nodemailer.createTransport(service);
    };

    sendMail(emailBody){
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(emailBody, (error, info) =>{
                error ? reject(error) : resolve(info);
            }); 
        });
    };
};

module.exports = MailClient;
