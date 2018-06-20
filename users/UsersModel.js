const db = require('../db');

const getAllUsers = callback => db.get().collection('users').find()
    .project({password: false}).toArray(callback); 

const getOneUser = (email, callback) => db.get().collection('users').findOne({email}, callback);

const createUser = (user, callback) => db.get().collection('users').insertOne(user, callback);

const deleteUser = (id, callback) => db.get().collection('users')
    .deleteOne({ _id: db.ObjectId(id) }, callback);

const confirmUser = (_id, callback) => db.get().collection('users')
    .updateOne({_id: db.ObjectId(_id)}, {$set: {confirm: true}}, callback);

const addGoodsToUser = ({ _id, goods }, callback) => db.get().collection('users')
    .updateOne({_id: db.ObjectId(_id)}, { $set: { goods } }, callback);

const getUserGoods = (id, callback) => db.get().collection('users').findOne({_id: db.ObjectId(id)}, callback);

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    deleteUser,
    confirmUser,
    addGoodsToUser,
    getUserGoods
};
