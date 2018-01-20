const jwt = require('jsonwebtoken');
const config = require('../../config');
const authModel = require('../models/authModel')

module.exports = {
    postLogin,
    postLogout,
    postSignUp
}

async function postLogin(ctx) {
    let iat = Math.floor(Date.now() / 1000) - 30;
    user_id = ctx.state.user.id;
    let jwt_payload = {
        id: ctx.state.user.id, 
        iat: iat, 
        identity: ctx.state.user.identity
    }
    await authModel.updateUserToken(iat, user_id);

    let token = jwt.sign(jwt_payload, config.JWT_SECRET_KEY);
    ctx.body = {token: token};
}

async function postLogout(ctx) {

}

async function postSignUp(ctx) {

}
