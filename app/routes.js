const Router = require('koa-router');
const db = require('./utils/database')

let router = new Router()
    .get('/', async (ctx, next)=>{
        var testing;
        testing = await db.query('SELECT 1 + 1 AS solution');
        console.log(testing);
        ctx.body = "testing testing"
      });

module.exports = router