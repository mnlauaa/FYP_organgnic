const testModel = require('../models/testModel');

module.exports = {
    /* 
    testing  
    */
    testing
}



async function testing(ctx){
    var testing = await testModel.getTest();
    console.log(testing);
    ctx.body = "testing testing"
}
