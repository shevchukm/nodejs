var  goods = require('../storage/Goods.json');

exports.all = function(){
    return goods;
}

exports.one = function(name){
    return (goods.find(function(good){
        return good.name === name;
    }));
}

exports.create = function(body){
    goods.push(body);
};

exports.delete = function(name){
    goods = goods.filter(function(good){
        return good.name !== name;
    });
};

exports.upDate = function(name, obj){
   var good = goods.find(function(good){
        good.name = name
    });
    good = obj;
};
