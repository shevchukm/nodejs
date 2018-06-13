var UsersModel = require('./UsersModel');

class UserController {

    getAllUsers(req, res) {
        UsersModel.getAllUsers((err, docs) => {
            err ? res.status(500).send('something went wrong on loading users') : res.send(docs)
        });
    };

    getOneUser(req, res) {
        UsersModel.getOneUser(req.params.email, (err, docs) => {
            err ? res.status(500).send('something went wrong on loading this user') : res.send(docs)
        });
    };

    createUser(req, res) {
        UsersModel.createUser(req.body, err => {
            err ? res.status(500).send('server have got problems with add user') : res.status(200).send('successfully created');
        });
    };

    deleteUser(req, res) {
        UsersModel.deleteUser(req.body.id, err => {
            err ? res.status(500).send('server have got problems with delete user') : res.status(200).send('successfully deleted');
        });
    };
};

module.exports = new UserController();
