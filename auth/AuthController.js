const jwt = require('jsonwebtoken');
const UserModel = require('../users/UsersModel');

class AuthController {
    login(req, res) {
        UserModel.getOneUser(req.body.user.email, (err, user) => {
            if (err) {
                res.status(500).send(err)
            } else if (!user){
                res.status(404).send('user not found');
            } else if (user.password !== req.body.user.password) {
                res.status(403).send('wrong password');
                } else if (!user.confirm) {
                    res.status(403).send('you have not confirmed your email yet')
                    } else {
                        jwt.sign({ user }, 'secretkey', function(err, token){
                            if (err){
                                res.status(404).send(err);
                            } else {
                                res.send( { token: token });
                            }
                        });
                    };
        });
    
    };
    
    authorization(req, res, next) {
        jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
            if (err) {
                res.status(403).send('you are not logged in ');
            }
            else {
                req.body._id = decoded.user._id;
                next();
            }
        });
    };
};

module.exports = new AuthController();

