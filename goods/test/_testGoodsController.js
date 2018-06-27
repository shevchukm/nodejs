const expect = require('chai').expect;
const sinon  = require('sinon');
const GoodsModel = require('../GoodsModel');
const GoodsController = require('../GoodsController');

describe("GoodsController", function() {
    const GoodsModelMock = sinon.mock(GoodsModel);
    let req = {
        params: {id: 1},
        body: {id: 1}
    };
    let res = {};

    describe("#getAllGoods", ()=>{
        it("should send all goods", done => {
            const expectedResult = { goods: [ {a:1}, {b:2}] };
            GoodsModelMock.expects('getAllGoods').yields(null, expectedResult);    
            GoodsController.getAllGoods(req,res);
            expect(res.data.send.goods).to.deep.equal([ {a:1}, {b:2} ]);
            done()
        });
    
        it("should send an error 'something went wrong on loading goods' with status 500", done => {
            GoodsModelMock.expects('getAllGoods').yields(true, []);
            GoodsController.getAllGoods(req, res);
            expect(res.data).to.deep.equal({status: 500, send: 'something went wrong on loading goods'});
            done()
        });
    });
    describe("#getOneGood", () => {
        it("should send one good", done => {
            const expectedResult = {_id: 1 ,name: 'mike', age: 22};
            GoodsModelMock.expects('getOneGood').yields(null, expectedResult)    
            GoodsController.getOneGood(req, res);
            expect(res.data.send).to.deep.equal({_id: 1 ,name: 'mike', age: 22});
            done()
        });
    
        it("should send an error 'something went wrong on loading this good' with status 500", done => {
            const expectedResult = {_id: 1 ,name: 'mike', age: 22};
            GoodsModelMock.expects('getOneGood').yields(true, expectedResult);
            GoodsController.getOneGood(req, res);
            expect(res.data).to.deep.equal({status: 500, send: 'something went wrong on loading this good'});
            done()
        });
    });

    describe("#createGood", () => {
        it("should send status 200 and message 'successfully added'", done => {
            GoodsModelMock.expects('createGood').yields(null)    
            GoodsController.createGood(req, res);
            expect(res.data).to.deep.equal({status: 200, send: 'successfully added'});
            done()
        });
    
        it("should send an error 'server have got problems with add good' with status 500 ", done => {

            GoodsModelMock.expects('createGood').yields(true);
            GoodsController.createGood(req, res);
            expect(res.data).to.deep.equal({status: 500, send: 'server have got problems with add good'});
            done()
        });
    });

    describe("#deleteGood", () => {
        it("should send status 200 and message 'successfully deleted'", done => {
            GoodsModelMock.expects('deleteGood').yields(null);
            GoodsController.deleteGood(req, res);
            expect(res.data).to.deep.equal({status: 200, send: 'successfully deleted'});
            done()
        });
    
        it("should send an error 'server have got problems with delete good' with status 500 ", done => {
            GoodsModelMock.expects('deleteGood').yields(true);
            GoodsController.deleteGood(req, res);
            expect(res.data).to.deep.equal({status: 500, send: 'server have got problems with delete good'});
            done()
        });
    });

    describe("#responseHandler", () => {
        it("should send status 200 and message 'it success message'", done => {

            const messages = [ 'it error message', 'it success message']

            GoodsController.responseHandler(null, res, messages);
            expect(res.data).to.deep.equal({status: 200, send: 'it success message'});
            done()
        });

        it("should send status 500 and message 'it error message'", done => {
            messages = [ 'it error message', 'it success message'];
            GoodsController.responseHandler(true, res, messages);
            expect(res.data).to.deep.equal({status: 500, send: 'it error message'});
            done()
        });

        it("should send object", done => {

            const expectedResult = { goods: [ {a:1}, {b:2}] };

            const messages = [ 'it error message', 'it success message'];

            GoodsController.responseHandler(null, res, messages, expectedResult );
            expect(res.data.send).to.deep.equal(expectedResult);
            done()
        });
    });
});
