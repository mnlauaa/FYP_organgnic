const db = require('../utils/database');

const test ={
    //testing
    async testing(ctx, next){
        var testing;
        testing = await db.query('SELECT 1 + 1 AS solution');
        console.log(testing);
        ctx.body = "testing testing"
      }
}

module.exports = test