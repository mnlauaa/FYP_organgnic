const userModel = require('../models/userModel');
const config = require('../../config')

module.exports = {
    getMe,
    getMeFarm,
    getUserById,
    getFavoriteFarm,
    getfarmById,
    getFarmList,
    getFarmReview,
    putMe,
    putMeFarm
    // getBuyers
}

async function getMe(ctx){
    let id = ctx.state.user.id;
    let users = await userModel.findUserById(id);
    ctx.body = users[0];
}

async function getMeFarm(ctx){
    let id = ctx.state.user.id;
    let users = await userModel.findFarmById(id);
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
	let farm = await userModel.findFarmById(id);
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
        profile_pic = config.SERVER.IP + 'user/' + ctx.req.file.filename;
    await userModel.updateUser(id, data, profile_pic);
    ctx.body = { success: "succes" };
}

async function putMeFarm(ctx){
    let id = ctx.state.user.id;
    let data = [
        ctx.req.body.display_name,
        ctx.req.body.address,
        ctx.req.body.phone_number 
    ]
    let profile_pic, banner_pic;
    if(ctx.req.files){
        profile_pic = ctx.req.files.icon;
        banner_pic = ctx.req.files.banner
        if(profile_pic)
            profile_pic = config.SERVER.IP + 'user/' + profile_pic[0].filename;
        if(banner_pic)
            banner_pic = config.SERVER.IP + 'user/' + banner_pic[0].filename;
    }
    
    await userModel.updateUser(id, data, profile_pic);
    await userModel.updateFarm(id, [ctx.req.body.about_intro], banner_pic);
    ctx.body = { success: "succes" };
}



// async function getBuyers(ctx){
// 	let buyers = await userModel.getAll('buyers');
// 	ctx.body = buyers;
// }