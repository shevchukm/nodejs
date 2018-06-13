var db = require('../db');

const getAllUsers = (callback) => db.get().collection('users').find().toArray(callback); 

const getOneUser = (email, callback) => db.get().collection('users').findOne({email}, callback);

const createUser = (user, callback) => db.get().collection('users').insertOne(user, callback);

const deleteUser = (id, callback) => db.get().collection('users')
    .deleteOne({ _id: db.ObjectId(id) }, callback);

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    deleteUser
};
