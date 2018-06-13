const jwt = require('jsonwebtoken');
const UserModel = require('../users/UsersModel'); 

exports.login = function(req, res) {
    UserModel.getOneUser(req.body.user.email, (err, user) => {
        if (err) {
            res.status(500).send(err)
        } else if (user === null){
            res.status(403).send('user not found');
        } else if (user.password !== req.body.user.password) {
            res.status(403).send('wrong password');
            } else {
                jwt.sign({ user }, 'secretkey', function(err, token){
                    if (err){
                        res.status(403).send(err);
                    } else {
                        res.send( { token: token });
                    }
                });
        };
    });

};

exports.loggedIn = (req, res, next) => {
    jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.status(403).send('you dont have permissions for delete');
        }
        else {
            next();
        }
    });
};
