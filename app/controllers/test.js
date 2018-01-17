const db = require('../utils/database');
const testModel = require('../models/testModel')

const test ={
    //testing
    async testing(ctx, next){
        var testing = await testModel.getTest();
        console.log(testing);
        ctx.body = "testing testing"
      }
}

module.exports = test