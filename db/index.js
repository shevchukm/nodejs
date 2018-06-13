const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const state = {
    db: null
};

const connect = (url, done) => {
    if (state.db) {
        return done();
    }

    MongoClient.connect(url, (err, client) => {
        if (err) {
            return done(err);
        }
        state.db = client.db(process.env.DB);
        done();
    });
};

const get = () => state.db;


module.exports = {
    connect,
    get,
    ObjectId
}
