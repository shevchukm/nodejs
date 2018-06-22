const expect = require('chai').expect;
const sinon  = require('sinon');
const GoodsModel = require('../GoodsModel');
const GoodsController = require('../GoodsController');
const db = require('../../db/index')


describe("GoodsModel", function() {
   it("should return all goods", function(done){
        const GoodsModelMock = sinon.mock(GoodsModel);
        const expectedResult = { goods: [ {a:1}, {b:2}] };

        GoodsModelMock.expects('getAllGoods').yields(null, expectedResult);

        let req = {};
        let res = {
            sendData: '',
            status: () => console.log('fsdfdsf'),
            send: function(data){ this.sendData = data}

        };

        GoodsController.getAllGoods(req,res);
        expect(res.sendData.goods).to.deep.equal([ {a:1}, {b:2}])
        done()
    });
})
