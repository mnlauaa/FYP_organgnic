const jwt = require('jsonwebtoken');
const config = require('../../config');
const authModel = require('../models/authModel')

module.exports = {
    postLogin,
    postLogout,
    postSignUp
}

async function postLogin(ctx) {
    // let iat = Math.floor(Date.now() / 1000) - 30;
    // let jwt_payload = {
    //     id: ctx.state.user.id, 
    //     iat: iat, 
    //     identity: ctx.state.user.identity
    // }
    // if(ctx.state.user.identity == 'buyers')
    //     authModel.updateBuyerToken()


    // let token = jwt.sign(jwt_payload, config);
    // ctx.body = "You Login";
}

async function postLogout(ctx) {

}

async function postSignUp(ctx) {

}
