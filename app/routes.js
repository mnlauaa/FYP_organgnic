const Router = require('koa-router');
const passport = require('koa-passport');
const testCtrl = require('./controllers/test');
const userCtrl = require('./controllers/user');
const authCtrl = require('./controllers/auth');
const productCrtl = require('./controllers/product');
const recoedCrtl = require('./controllers/record');
const db = require('./utils/database');

let test = new Router()
    .get('/test', passport.authenticate('jwt', { session: false }), testCtrl.testing)
    .post('/login', passport.authenticate('normal-login', {session: false}), authCtrl.postLogin)
    .get('/buyer/:id', userCtrl.getUser)
    .get('/seller/:id', userCtrl.getUser)
    .get('/seller', userCtrl.getSellerList)
    .get('/product', productCrtl.getProducts)
    .get('/product/:id', productCrtl.getProductById)
    .get('/order_form', productCrtl.getOrderForms)
    .get('/order_form/:id', productCrtl.getOrderFormById)
    .get('/record', recoedCrtl.getChatLogs)
    .get('/record/:id', recoedCrtl.getChatLogsById)
    // .get('record/:sender_id', recoedCrtl.getChatLogsBySender)
    .post('/order_form/', productCrtl.postOrderForms)

module.exports = test