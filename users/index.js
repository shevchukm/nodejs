const UsersController = require('./UsersController');
const AuthController = require('../auth/AuthController')

module.exports = (app) => {

    app.get('/users', UsersController.getAllUsers.bind(UsersController));

    app.post('/users', UsersController.createUser.bind(UsersController));

    app.delete('/users', AuthController.authorization, UsersController.deleteUser.bind(UsersController));

    app.get('/confirm?:id', UsersController.confirmUserEmail.bind(UsersController));

    app.post('/users/goods', AuthController.authorization, UsersController.addGoodsToUser.bind(UsersController));

    app.get('/users/goods', AuthController.authorization, UsersController.getUserGoods.bind(UsersController));
};
