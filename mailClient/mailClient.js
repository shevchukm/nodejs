const nodemailer = require('nodemailer');

class MailClient {

    generateMailBody(from = '', subject=''){
        this.mailBody = { from, subject }
    };

    configMailServise(service = '', auth = { user: '', pass: '' }){
        this.transporter = nodemailer.createTransport({service, auth});
    };

    sendMail(mail, text){
        this.mailBody.to = mail;
        this.mailBody.text = text;
        
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(this.mailBody, (error, info) =>{
                error ? reject(error) : resolve(info);
            }); 
        });
    };
};

module.exports = MailClient;
