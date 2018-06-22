const expect = require('chai').expect;
const sinon  = require('sinon');
const AuthController = require('../AuthController')

describe('Class AuthController', () => {
    describe('#authorization', () => {
        it("should return TypeError without arguments", () => {
            expect(AuthController.authorization).to.throw(TypeError);
        });

        it("should accept three arguments", () => {
            expect(AuthController.authorization.length).to.equal(3);
        });
        
        it("should call response with error", () => {

        });
    });
});
