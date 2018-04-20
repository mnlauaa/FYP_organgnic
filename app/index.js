const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport')
const logger = require('koa-logger');
const cors = require('koa2-cors');
const serve = require('koa-static');

const routers = require('./routes');
const config = require('../config');
const db = require('./utils/database');
const auth = require('./auth');
const ioCtrl = require('./utils/socketio')


const app = new Koa();
auth.init();


app.use(logger())
    .use(cors())
    .use(bodyParser())
    .use(passport.initialize())
    .use(serve('uploads'))
    .use(routers.routes());
    // .listen(config.PORT);

const server = require('http').createServer(app.callback());
ioCtrl.init(server)
server.listen(config.PORT);

console.log("localhost:" + config.PORT);