const Router = require('koa-router');
const testCtrl = require('./controllers/test')
const db = require('./utils/database')

let test = new Router()
    .get('/', testCtrl.testing);

module.exports = test