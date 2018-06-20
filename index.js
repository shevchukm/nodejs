require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var GoodsModule = require('./goods');
var UsersModule = require('./users');
var AuthModule = require('./Auth');
var db = require('./db')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



GoodsModule(app);
UsersModule(app);
AuthModule(app);

app.get('/', function(req, res) {
    res.send('hello');
});

db.connect(process.env.MONGO_URL, err => {
    if (err){
        return console.log(err)
    };

    app.listen(process.env.PORT, function() {
        console.log('api app started');
    });
});
