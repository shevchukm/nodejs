var GoodsModel = require('./GoodsModel');

class GoodsController {
    getAllGoods(req, res) {
        GoodsModel.getAllGoods((err, docs) => {
            err ? res.status(500).send('something went wrong on loading goods') : res.send(docs)
        });
    };

    getOneGood(req, res) {
        GoodsModel.getOneGood(req.params.id, (err, docs) => {
            err ? res.status(500).send('something went wrong on loading this good') : res.send(docs)
        });
    };

    createGood(req, res) {
        GoodsModel.createGood(req.body, err => {
            err ? res.status(500).send('server have got problems with add good') : res.status(200)
                .send('successfully added');
        });
    };

    deleteGood(req, res) {
        GoodsModel.deleteGood(req.body.id, err => {
            err ? res.status(500).send('server have got problems with delete good') : res.status(200)
                .send('successfully deleted');
        });
    };
};

module.exports = new GoodsController();
