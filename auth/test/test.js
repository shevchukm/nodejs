const expect = require('chai').expect;
const sinon  = require('sinon');
const UsersModel = require('../../users/UsersModel')
const AuthController = require('../AuthController')

describe('AuthController', () => {
    mockUsersModel = sinon.mock(UsersModel);
    let req = {
        headers: {token: ''},
        body: {}
    };
    let res = {
        data: {},
        status: function(data){this.data.status = data; return this},
        send: function(data){this.data.send = data}
    };
    const next = () => {}

    describe('#authorization', () => {
        it("should return TypeError without arguments", () => {
            expect(AuthController.authorization).to.throw(TypeError);
            
        });

        it("should accept three arguments", () => {
            expect(AuthController.authorization.length).to.equal(3);
        });
        
        it('should send error with status 403 and message "you are not logged in"', ()=> {
            AuthController.authorization(req, res, next);
            expect(res.data).to.deep.equal({status: 403, send: 'you are not logged in '});
        });

        it('should set _id to request body if token pass verify', ()=> {
            req.headers.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViMjdiYzNiNDk4ZDkzMzk1ZjNiYWFjZiIsIm5hbWUiOiJNeWtoYWlsbyBTaGV2Y2h1ayIsImVtYWlsIjoibW1pa3JvYkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjM2OTg1MiIsImNvbmZpcm0iOnRydWUsImdvb2RzIjpbeyJfaWQiOiI1YjJhNWQ1Mjc3ZTY2YzI1NjE2ZTk1ZGEiLCJjYXRlZ29yeSI6ImNhcnMiLCJwcmljZSI6IjgwMCIsInN0b2NrZWQiOnRydWUsIm5hbWUiOiJwb3JzaGUifV19LCJpYXQiOjE1Mjk5MzM1NTB9.JnDxQRdhRyob6QUjIEmr-qPtiLDkru44e9PnUmQjrus'
            AuthController.authorization(req, res, next);
            expect(req.body._id).to.equal('5b27bc3b498d93395f3baacf');
        });
    });

    describe('#login', () => {
        it('should send error with status 500 and error message', () => {
            req.body.user = {email: ''};
            const error = true
            mockUsersModel.expects('getOneUser').yields(error, {name: 'misha', email: ''});
            AuthController.login(req, res);
            expect(res.data).to.be.deep.equal({status: 500, send: true})
        });

        it('should send error with status 404 and error message "user not found"', () => {
            req.body.user = {email: ''};
            const error = null;
            mockUsersModel.expects('getOneUser').yields(error, null);
            AuthController.login(req, res);
            expect(res.data).to.be.deep.equal({status: 404, send: "user not found"})
        });
    });
});
