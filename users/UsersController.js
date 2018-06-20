const UsersModel = require('./UsersModel');
const mailClient = require('../mailClient/mailClient');

const credentials = {
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_PASS
    }
};
const confirmMail = new mailClient(credentials);

const mailBody = {
    from: 'testnodemisha@gmail.com',
    subject: 'Sending Email for confirmation account'
}

class UserController {

    responseHandler(err, res, message, users) {
        const [errorMessage, succsesMessage] = message;
        
        err ? res.status(500).send(errorMessage)
            : users ? res.send(users) : res.status(200).send(succsesMessage)
    };

    getAllUsers(req, res) {
        UsersModel.getAllUsers((err, users) => {
            const message = ['error on loading users'];

            this.responseHandler(err, res, message, users);
        });
    };

    getOneUser(req, res) {
        UsersModel.getOneUser(req.params.email, (err, users) => {
            const message = ['something went wrong on loading this user'];

            this.responseHandler(err, res, message, users);
        });
    };

    createUser(req, res) {
        req.body.confirm = false;
        req.body.goods = [];

        UsersModel.createUser(req.body, (err, user) => {
            mailBody.to = req.body.email;
            mailBody.text = process.env.confirmPath + user.ops[0]._id;

            const message = ['server have got problems with add user', 'successfully created'];

            err ? res.status(500).send('server have got problems with add user') : confirmMail.sendMail(mailBody)
                .then(response => res.send(`confirmation has sent to ${response.envelope.accepted}`))
                .catch(err => console.log(err));
            this.responseHandler(err, res, message);
        });
    };

    deleteUser(req, res) {
        UsersModel.deleteUser(req.body.id, err => {
            const message = ['server have got problems with delete user', 'successfully deleted'];

            this.responseHandler(err, res, message);
        });
    };

    confirmUserEmail(req, res) {
        UsersModel.confirmUser(req.params.id, err => {
            const message = ['some problems with server on confirm', 'succsesfully confirmed'];

            this.responseHandler(err, res, message);
        });
    };

    addGoodsToUser(req, res) {
        UsersModel.addGoodsToUser(req.body, (err) => {
            console.log(req.body)
            const message = ['some problems with server on setting goods', 'succsesfully updated'];

            this.responseHandler(err, res, message);
        });
    };

    getUserGoods(req, res) {
        UsersModel.getUserGoods(req.body._id, (err, user) => {
            const message = ['some problems with server on setting goods'];

            this.responseHandler(err, res, message, user);
        });
    };
};

module.exports = new UserController();
