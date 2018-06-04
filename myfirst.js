var  express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var goodsController = require('./controllers/Goods');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', function(req, res){
  res.send('hello')
})

app.get('/goods', goodsController.all);

app.get('/goods/:name', goodsController.one);

app.post('/goods', goodsController.create);

app.delete('/goods', goodsController.delete);

app.listen(3012, function(){
  console.log('api app started')
})
