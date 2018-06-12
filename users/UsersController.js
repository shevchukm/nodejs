var UsersModel = require('./UsersModel');

exports.getAll = function(res, req) {
    req.send(UsersModel.getAll());
};

exports.getOne = function(req, res) {
    return res.send(UsersModel.getOne(req.data.email));
};

exports.create = function(req, res) {
    UsersModel.create(req.body);
    res.sendStatus(200);
};

exports.delete = function(req, res) {
    UsersModel.delete(req.body.id);
    res.sendStatus(200);
};
