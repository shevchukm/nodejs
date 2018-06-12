const UsersController = require('./UsersController');
const AuthController = require('../auth/AuthController')

module.exports = (app) => {

    app.get('/users', UsersController.getAll);

    app.post('/users', UsersController.create);

    app.delete('/users', AuthController.loggedIn, UsersController.delete);
};
