const Router = require('koa-router');
const testCtrl = require('./controllers/test')
const userCtrl = require('./controllers/user')
const db = require('./utils/database')

let test = new Router()
    .get('/', testCtrl.testing)
    .get('/buyer/:id', userCtrl.getBuyerById)
    .get('/buyer', userCtrl.getBuyers)
    .get('/seller/:id', userCtrl.getSellerById)
    .get('/seller', userCtrl.getSellers);

module.exports = test