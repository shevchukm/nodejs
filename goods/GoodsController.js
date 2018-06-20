const GoodsModel = require('./GoodsModel');

class GoodsController {
    responseHandler(err, res, message, docs) {
        err ? res.status(500).send(message[0])
            : docs ? res.send(docs) : res.status(200).send(message[1])
    };

    getAllGoods(req, res) {
        GoodsModel.getAllGoods((err, docs) => {
            const message = ['something went wrong on loading goods'];
            this.responseHandler(err, res, message, docs)
        });
    };

    getOneGood(req, res) {
        GoodsModel.getOneGood(req.params.id, (err, docs) => {
            const message = ['something went wrong on loading this good'];
            this.responseHandler(err, res, message, docs);
        });
    };

    createGood(req, res) {
        GoodsModel.createGood(req.body, err => {
            const message = ['server have got problems with add good', 'successfully added']
            this.responseHandler(err, res, message)
        });
    };

    deleteGood(req, res) {
        GoodsModel.deleteGood(req.body.id, err => {
            const message = ['server have got problems with delete good', 'successfully deleted']
            this.responseHandler(err, res, message)
        });
    };
};

module.exports = new GoodsController();
