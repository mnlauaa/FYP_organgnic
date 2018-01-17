const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routers = require('./routes');
const config = require('../config');
const db = require('./utils/database').db;
const app = new Koa();

app.use(bodyParser())
    .use(routers.routes())
    //catch err
    .use(async (ctx, next)=>{
        try {
            await next()
        } catch (err) {
            ctx.body = err.message
            ctx.status = err.status || 500
        }
    }) 
    .listen(config.port);
    console.log("start at localhost:" + config.port + "/");