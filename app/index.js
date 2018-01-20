const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport')
const logger = require('koa-logger');
const routers = require('./routes');
const config = require('../config');
const db = require('./utils/database');
const auth = require('./auth');

const app = new Koa();

app.use(logger())
    .use(async (ctx, next)=>{
        try {
            auth.init();
            await next()
        }catch(err) {
            ctx.body = err.message
            ctx.status = err.status || 500
        }
    })
    .use(bodyParser())
    .use(passport.initialize())
    .use(routers.routes())
    //catch err
    .use(async (ctx, next)=>{
        try {
            await next()
        }catch(err) {
            ctx.body = err.message
            ctx.status = err.status || 500
        }
    })
    .listen(config.PORT);

console.log("localhost:" + config.PORT);