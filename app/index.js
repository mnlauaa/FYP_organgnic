const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routers = require('./routes');
const config = require('../config');
const db = require('./utils/database').db;
const app = new Koa();

app.use(bodyParser())
  .use(routers.routes())
  .listen(config.port);