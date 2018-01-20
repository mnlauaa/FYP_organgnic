const testModel = require('../models/testModel');

module.exports = {
    /* 
    testing  
    */
    testing
}



async function testing(ctx){
    var testing = await testModel.getTest();
    ctx.body = "testing testing"
    console.log(ctx.state.user.username)
}
