var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var GoodsModule = require('./goods');
var UsersModule = require('./users');
var AuthModule = require('./Auth');

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

app.listen(3012, function() {
    console.log('api app started');
});
