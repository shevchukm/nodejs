const UsersController = require('./UsersController');
const AuthController = require('../auth/AuthController')

module.exports = (app) => {

    app.get('/users', UsersController.getAllUsers);

    app.post('/users', UsersController.createUser);

    app.delete('/users', AuthController.loggedIn, UsersController.deleteUser);
};
