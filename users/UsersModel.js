const db = require('../db');

class UserModel {
    getAllUsers(callback) {
        db.get().collection('users').find()
            .project({password: false}).toArray(callback);
    }

    getOneUser(email, callback) {
        db.get().collection('users').findOne({email}, callback);
    }

    createUser(user, callback) {
        db.get().collection('users').insertOne(user, callback);
    }

    deleteUser(id, callback) {
        db.get().collection('users')
            .deleteOne({ _id: db.ObjectId(id) }, callback);
    }

    confirmUser(_id, callback) {
        db.get().collection('users')
            .updateOne({_id: db.ObjectId(_id)}, {$set: {confirm: true}}, callback);
    }

    addGoodsToUser({ _id, goods }, callback) {
        db.get().collection('users')
            .updateOne({_id: db.ObjectId(_id)}, { $set: { goods } }, callback);
    }

    getUserGoods(id, callback) {
        db.get().collection('users').findOne({_id: db.ObjectId(id)}, callback);
    }
}



module.exports = new UserModel();
