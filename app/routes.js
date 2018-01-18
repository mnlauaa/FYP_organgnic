const Router = require('koa-router');
const testCtrl = require('./controllers/test')
const userCtrl = require('./controllers/user')
const db = require('./utils/database')

let test = new Router()
    .get('/', testCtrl.testing)
    .get('/buyer/:id', userCtrl.getBuyer)
    .get('/seller/:id', userCtrl.getBuyer)
    .get('/seller', userCtrl.getSellerList);

module.exports = test