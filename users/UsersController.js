const UsersModel = require('./UsersModel');
const mailClient = require('../mailClient/mailClient');

const confirmMail = new mailClient();

confirmMail.configMailServise(
    'gmail', {
     user: 'testnodemisha@gmail.com',
     pass: 'Aa369852'
    }
);



confirmMail.generateMailBody('testnodemisha@gmail.com', 'Sending Email for confirmation account');

class UserController {

    responseHandler(err, res, message, users) {
        err ? res.status(500).send(message[0])
            : users ? res.send(users) : res.status(200).send(message[1])
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
        const path = 'http://localhost:3012/confirm';

        req.body.confirm = false
        UsersModel.createUser(req.body, (err, user) => {
            const message = ['server have got problems with add user', 'successfully created'];

            err ? res.status(500).send('server have got problems with add user') : confirmMail.sendMail(req.body.email, (path + user.ops[0]._id))
                .then(res => console.log(res)).catch(err => console.log(err));
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
