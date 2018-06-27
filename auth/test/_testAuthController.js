const expect = require('chai').expect;
const sinon  = require('sinon');
const UsersModel = require('../../users/UsersModel')
const AuthController = require('../AuthController')

describe('AuthController', () => {
    const mockUsersModel = sinon.mock(UsersModel);
    let req = {body: {}};
    let res = {};
    const next = () => {};

    describe('#authorization', () => {
        req.headers = {token: ''};

        it('should send message "you are not logged in" with status 403', done => {
            res.status = status => {
                expect(status).to.be.equal(403);
                done();
            };
            res.send = message => {
                expect(message).to.be.equal("you are not logged in");
                done();
            };

            AuthController.authorization(req, res, next);
        });

        it('should set _id to request body if token pass verify', done => {
            req.headers.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViMjdiYzNiNDk4ZDkzMzk1ZjNiYWFjZiIsIm5hbWUiOiJNeWtoYWlsbyBTaGV2Y2h1ayIsImVtYWlsIjoibW1pa3JvYkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjM2OTg1MiIsImNvbmZpcm0iOnRydWUsImdvb2RzIjpbeyJfaWQiOiI1YjJhNWQ1Mjc3ZTY2YzI1NjE2ZTk1ZGEiLCJjYXRlZ29yeSI6ImNhcnMiLCJwcmljZSI6IjgwMCIsInN0b2NrZWQiOnRydWUsIm5hbWUiOiJwb3JzaGUifV19LCJpYXQiOjE1Mjk5MzM1NTB9.JnDxQRdhRyob6QUjIEmr-qPtiLDkru44e9PnUmQjrus'
            AuthController.authorization(req, res, next);
            expect(req.body._id).to.equal('5b27bc3b498d93395f3baacf');
            done();
        });
    });

    describe('#login', () => {
        it('should send error with status 500 and error message', done => {
            req.body.user = {email: ''};
            res.status = status => {
                expect(status).to.be.equal(500);
                done();
            };
            res.send = message => {
                expect(message).to.be.equal('some error');
                done();
            };
            const error = 'some error'
            
            mockUsersModel.expects('getOneUser').yields(error, {name: 'misha', email: ''});
            AuthController.login(req, res);
        });

        it('should send error with status 404 and error message "user not found"', done => {
            req.body.user = {email: ''};

            const error = null;

            res.status = status => {
                expect(status).to.be.equal(404);
                done();
            };
            res.send = message => {
                expect(message).to.be.equal('user not found');
                done();
            };

            mockUsersModel.expects('getOneUser').yields(error, null);
            AuthController.login(req, res);
        });
    });
});
