const db = require('../db')

const getAllGoods = callback => db.get().collection('goods').find().toArray(callback); 

const getOneGood = (_id, callback) => db.get().collection('goods').findOne({_id}, callback);

const createGood = (good, callback) => db.get().collection('goods').insertOne(good, callback);

const deleteGood = (id, callback) => db.get().collection('goods')
    .deleteOne({ _id: db.ObjectId(id) }, callback);

module.exports = {
    getAllGoods,
    getOneGood,
    createGood,
    deleteGood
}
