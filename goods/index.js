const GoodsController = require('./GoodsController');
const AuthController = require('../auth/AuthController');

module.exports = (app) => {

    app.get('/goods', GoodsController.getAllGoods);

    app.get('/goods/:name', GoodsController.getOneGood);

    app.post('/goods', GoodsController.createGood);

    app.delete('/goods', AuthController.loggedIn, GoodsController.deleteGood);
}
