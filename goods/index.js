const GoodsController = require('./GoodsController');
const AuthController = require('../auth/AuthController')
module.exports = (app) => {

    app.get('/goods', GoodsController.getAll);

    app.get('/goods/:name', GoodsController.getOne);

    app.post('/goods', GoodsController.create);

    app.delete('/goods', AuthController.loggedIn, GoodsController.delete);
}
