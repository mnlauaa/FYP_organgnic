const userModel = require('../models/userModel');

module.exports = {
    getMe,
    getUser,
    getSellerList,
    putMe
    // getBuyers
}

async function getMe(ctx){
    let id = ctx.state.user.id;
    let users = await userModel.findUserById(id);
    ctx.body = users[0];
}

async function getUser(ctx){
    let id = ctx.params.id;
	let users = await userModel.findUserById(id);
    ctx.body = users[0];
}

async function getfarm(ctx){
    let id = ctx.params.id;
	let farm = await userModel.findUserById(id);
    ctx.body = farm[0];
}

async function getFarmList(ctx){
	let farms = await userModel.findAllFarms();
	ctx.body = farms;
}

async function putMe(ctx){
    
}

// async function getBuyers(ctx){
// 	let buyers = await userModel.getAll('buyers');
// 	ctx.body = buyers;
// }