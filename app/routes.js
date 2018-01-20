const Router = require('koa-router');
const passport = require('koa-passport');
const testCtrl = require('./controllers/test');
const userCtrl = require('./controllers/user');
const authCtrl = require('./controllers/auth');
const db = require('./utils/database');

let test = new Router()
    .get('/', testCtrl.testing)
    .post('/login', passport.authenticate('normal-login', {session: false}), authCtrl.postLogin)
    .get('/buyer/:id', userCtrl.getUser)
    .get('/seller/:id', userCtrl.getUser)
    .get('/seller', userCtrl.getSellerList);

module.exports = test