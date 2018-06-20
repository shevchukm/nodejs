const GoodsController = require('./GoodsController');
const AuthController = require('../auth/AuthController');

module.exports = (app) => {

    app.get('/goods', GoodsController.getAllGoods.bind(GoodsController));

    app.get('/goods/:name', GoodsController.getOneGood.bind(GoodsController));

    app.post('/goods', GoodsController.createGood.bind(GoodsController));

    app.delete('/goods', AuthController.authorization, GoodsController.deleteGood.bind(GoodsController));
}
