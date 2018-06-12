const AuthController = require('./AuthController');

module.exports = (app) => {
    app.post('/users/login', AuthController.login);
};
