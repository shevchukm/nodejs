var UsersModel = require('./UsersModel');
const confirm = require('../nodemailer');
class UserController {

    getAllUsers(req, res) {
        UsersModel.getAllUsers((err, users) => {
            err ? res.status(500).send('something went wrong on loading users') : res.send(users)
        });
    };

    getOneUser(req, res) {
        UsersModel.getOneUser(req.params.email, (err, users) => {
            err ? res.status(500).send('something went wrong on loading this user') : res.send(users)
        });
    };

    createUser(req, res) {
        req.body.confirm = false
        UsersModel.createUser(req.body, (err, user) => {
            err ? res.status(500).send('server have got problems with add user') : confirm.confirm(req.body.email, user.ops[0]._id);
            err ? res.status(500).send('server have got problems with add user') : res.status(200).send('successfully created');
        });
    };

    deleteUser(req, res) {
        UsersModel.deleteUser(req.body.id, err => {
            err ? res.status(500).send('server have got problems with delete user') : res.status(200).send('successfully deleted');
        });
    };

    confirmUserEmail(req, res) {
        UsersModel.confirmUser(req.params.id, (err) => {
            err ? res.status(500).send('some problems with server on confirm') : res.status(200).send('succsesfully confirmed')
        });
    };

    addGoodsToUser(req, res) {
        UsersModel.addGoodsToUser(req.body, (err) => {
            err ? res.status(500).send('some problems with server on setting goods') : res.status(200).send('succsesfully updated')
        });
    };

    getUserGoods(req, res) {
        UsersModel.getUserGoods(req.body._id, (err, user) => {
            err ? res.status(500).send('something went wrong on getting users goods' ) : res.send(user.goods)
        });
    };
};

module.exports = new UserController();
