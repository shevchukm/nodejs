var users = require('../storage/Users.json');

exports.getAll = function() {
    return users;
};

exports.getOne = function(email) {
    return (users.find(function(user) {
        return user.email === email;
    }));
};

exports.create = function(body) {
    body.id = users.length ? users[users.length-1].id + 1 : 1;
    users.push(body);
};

exports.delete = function(id) {
    users = users.filter(function(user) {
        return user.id !== id;
    });
};

exports.upDate = function(email, obj) {
    var user = users.find(function(good) {
        user.email === email;
    });

    user = obj;
};
