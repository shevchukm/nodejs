const jwt = require('jsonwebtoken');
const UserModel = require('../users/UsersModel');

class AuthController {
    login(req, res) {
        UserModel.getOneUser(req.body.user.email, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            };
            if (!user){
                return res.status(404).send('user not found');
            };
            if (user.password !== req.body.user.password) {
                return res.status(403).send('wrong password');
            };
            if (!user.confirm) {
                return res.status(403).send('you have not confirmed your email yet')
            };
            jwt.sign({ user }, 'secretkey', function(err, token){
                if (err){
                    return res.status(404).send(err);
                };
                res.send( { token: token });
            });
        });
    
    };
    
    authorization(req, res, next) {
        jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
            if (err) {
                return res.status(403).send('you are not logged in ');
            };
            req.body._id = decoded.user._id;
            next();
        });
    };
};

module.exports = new AuthController();

