const jwt = require('jsonwebtoken');
const config = require('../../config');
const authModel = require('../models/authModel')

module.exports = {
    postLogin,
    postLogout,
    postSignUp,
    postFarmer,
    postFb
}

async function postLogin(ctx) {
    let iat = Math.floor(Date.now() / 1000) - 30;
    user_id = ctx.state.user.id;
    let jwt_payload = {
        id: ctx.state.user.id, 
        iat: iat, 
        identity: ctx.state.user.identity
    }
    let token = jwt.sign(jwt_payload, config.JWT_SECRET_KEY);
    await authModel.updateUserToken(iat, user_id);
    ctx.body = {token: token};
}

async function postLogout(ctx) {
    user_id = ctx.state.user.id
    let iat = Math.floor(Date.now() / 1000) - 30; 
    await authModel.updateUserToken(iat, user_id);
    ctx.body = "logouted";
}

async function postSignUp(ctx) {
    if(await authModel.checkUserVariableExist('username',ctx.request.body.username)[0] != null){
        let err = new Error('username has already been taken'); 
        err.status = 406;
        throw err;
    }
    if(await authModel.checkUserVariableExist('dispaly_name',ctx.request.body.dispaly_name)[0] != null){
        let err = new Error('display name has already been taken'); 
        err.status = 403;
        throw err;
    }
    if(!ctx.request.body.username || !ctx.request.body.password){
        let err = new Error('missing information');
        err.status = 400; 
        throw err;
    }
    let iat = Math.floor(Date.now() / 1000) - 30;
    let newUser = [
        ctx.request.body.username,
        ctx.request.body.password,
        ctx.request.body.dispaly_name,
        ctx.request.body.phone_number,
        ctx.request.body.address,
        iat
    ]
    await authModel.userSignUp(newUser);
    let token = jwt.sign(jwt_payload, config.JWT_SECRET_KEY);
    ctx.body = {token: token};
}

async function postFarmer(ctx) {

}

async function postFb(ctx) {

}
