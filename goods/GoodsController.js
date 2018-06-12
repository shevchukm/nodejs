var good = require('./GoodsModel');

exports.getAll = function(req, res) {
    res.send(good.getAll());
};

exports.getOne = function(req, res) {
    res.send(good.one(req.params.name));
};

exports.create = function(req, res) {
    good.create(req.body);
    res.sendStatus(200);
};

exports.delete = function(req, res) {
    good.delete(req.body.name);
    res.sendStatus(200);
};

exports.upDate = function(req, res) {
    good.upDate(req.body.name, reg.body);
    res.send(good.all());
};
