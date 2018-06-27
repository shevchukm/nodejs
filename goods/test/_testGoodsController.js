const expect = require('chai').expect;
const sinon  = require('sinon');
const GoodsModel = require('../GoodsModel');
const GoodsController = require('../GoodsController');

describe("GoodsController", function() {
    const GoodsModelMock = sinon.mock(GoodsModel);
    let req, res;

    beforeEach(() => {
        req = {
            params: { id: 1 },
            body: { id: 1 }
        };
        res = {};
    });

    afterEach(() => {
        req = {
            params: { id: 1 },
            body: { id: 1 }
        };
        res = {};
    });

    describe("#getAllGoods", ()=>{
        it("should send all goods", done => {
            res.status = () => {};
            res.send = goods => {
                expect(goods).to.be.deep.equal([ {a:1}, {b:2}]);
                done();
            };
            const expectedResult = [ {a:1}, {b:2}];
            GoodsModelMock.expects('getAllGoods').yields(null, expectedResult);    
            GoodsController.getAllGoods(req,res);
        });
    
        it("should send an error 'something went wrong on loading goods' with status 500", done => {
            res.status = status => {
                expect(status).to.be.equal(500);
                done();
            };
            res.send = message => {
                expect(message).to.be.equal('something went wrong on loading goods');
                done();
            };
            GoodsModelMock.expects('getAllGoods').yields(true, []);
            GoodsController.getAllGoods(req, res);
        });
    });
    describe("#getOneGood", () => {
        it("should send one good", done => {
            const expectedResult = {_id: 1 ,name: 'mike', age: 22};

            res.status = () => {};
            res.send = good => {
                expect(good).to.be.deep.equal({_id: 1 ,name: 'mike', age: 22});
                done();
            };

            GoodsModelMock.expects('getOneGood').yields(null, expectedResult)    
            GoodsController.getOneGood(req, res);
        });
    
        it("should send an error 'something went wrong on loading this good' with status 500", done => {
            const expectedResult = {_id: 1 ,name: 'mike', age: 22};

            res.status = status => {
                expect(status).to.be.equal(500);
                done();
            };
            res.send = message => {
                expect(message).to.be.equal('something went wrong on loading this good');
                done();
            };

            GoodsModelMock.expects('getOneGood').yields(true, expectedResult);
            GoodsController.getOneGood(req, res);
        });
    });

    describe("#createGood", () => {
        it("should send status 200 and message 'successfully added'", done => {
            res.status = status => {
                expect(status).to.be.equal(200);
                done();
            };
            res.send = message => {
                expect(message).to.be.equal('successfully added');
                done();
            };
    
            GoodsModelMock.expects('createGood').yields(null)    
            GoodsController.createGood(req, res);
        });
    
        it("should send an error 'server have got problems with add good' with status 500 ", done => {
            res.status = status => {
                expect(status).to.be.equal(500);
                done();
            };
            res.send = message => {
                expect(message).to.be.equal('server have got problems with add good');
                done();
            };
            GoodsModelMock.expects('createGood').yields(true);
            GoodsController.createGood(req, res);
        });
    });

    describe("#deleteGood", () => {
        it("should send status 200 and message 'successfully deleted'", done => {
            res.status = status => {
                expect(status).to.be.equal(200);
                done();
            };
            res.send = message => {
                expect(message).to.be.equal('successfully deleted');
                done();
            };
            GoodsModelMock.expects('deleteGood').yields(null);
            GoodsController.deleteGood(req, res);
        });
    
        it("should send an error 'server have got problems with delete good' with status 500 ", done => {
            res.status = status => {
                expect(status).to.be.equal(500);
                done();
            };
            res.send = message => {
                expect(message).to.be.equal('server have got problems with delete good');
                done();
            };
            GoodsModelMock.expects('deleteGood').yields(true);
            GoodsController.deleteGood(req, res);
        });
    });

    describe("#responseHandler", () => {
        it("should send status 200 and message 'it success message'", done => {
            const messages = [ 'it error message', 'it success message'];

            res.send = message => {
                expect(message).to.be.equal('it success message');
                done();
            };

            res.status = status => {
                expect(status).to.be.equal(200);
                done();
            };

            GoodsController.responseHandler(null, res, messages);
        });

        it("should send status 500 and message 'it error message'", done => {
            const messages = [ 'it error message', 'it success message'];
            res.send = message => {
                expect(message).to.be.equal('it error message');
                done();
            };

            res.status = status => {
                expect(status).to.be.equal(500);
                done();
            };

            GoodsController.responseHandler(true, res, messages);
        });

        it("should send object", done => {

            const expectedResult = [{a:1}, {b:2}] ;

            const messages = [ 'it error message', 'it success message'];

            res.send = object => {
                expect(object).to.be.deep.equal([{a:1}, {b:2}]);
                done();
            };

            res.status = status => {
                expect(status).to.be.equal(200);
                done();
            };

            GoodsController.responseHandler(null, res, messages, expectedResult );
            expect(res.data.send).to.deep.equal(expectedResult);
            done()
        });
    });
});
