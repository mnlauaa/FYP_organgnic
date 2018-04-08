const userModel = require('../models/userModel');
const config = require('../../config')

module.exports = {
    getMe,
    getUserById,
    getFavoriteFarm,
    getfarmById,
    getFarmList,
    getFarmReview,
    putMe
    // getBuyers
}

async function getMe(ctx){
    let id = ctx.state.user.id;
    let users = await userModel.findUserById(id);
    ctx.body = users[0];
}

async function getUserById(ctx){
    let id = ctx.params.id;
	let users = await userModel.findUserById(id);
    ctx.body = users[0];
}

async function getFavoriteFarm(ctx){
    let id = ctx.state.user.id;
    let farms = await userModel.findFavoriteFarms(id);
    ctx.body = farms
}

async function getfarmById(ctx){
    let id = ctx.params.id;
	let farm = await userModel.findUserById(id);
    ctx.body = farm[0];
}

async function getFarmList(ctx){
    let farms = await userModel.findAllFarms();
	ctx.body = farms;
}

async function getFarmReview(ctx){
    
}

async function putMe(ctx){
    let id = ctx.state.user.id;
    let data = [
        ctx.req.body.display_name,
        ctx.req.body.address,
        ctx.req.body.phone_number    
    ]
    let profile_pic = null;
    if(ctx.req.file)
        profile_pic = config.SERVER.IP + 'icon/' + ctx.req.file.filename;
    await userModel.updateUser(id, data, profile_pic);
    ctx.body = { success: "succes" };
}

// async function getBuyers(ctx){
// 	let buyers = await userModel.getAll('buyers');
// 	ctx.body = buyers;
// }