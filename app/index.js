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

const app = new Koa();
auth.init();


app.use(logger())
    .use(cors())
    .use(bodyParser())
    .use(passport.initialize())
    .use(serve('uploads'))
    .use(routers.routes())
//   catch err
    // .use(async (ctx, next)=>{
    //     try {
    //         await next()
    //     }catch(err) {
    //         ctx.body = err.message
    //         ctx.status = err.status || 500
    //     }
    // })
    .listen(config.PORT);

console.log("localhost:" + config.PORT);