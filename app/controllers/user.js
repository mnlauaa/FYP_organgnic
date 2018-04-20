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
    getFarmisFavorite,
    getAllCoupon,
    postMeFarmPickup,
    postMeFavorite,
    postFarmReview,
    postCoupon,
    putMe,
    putMeFarm,
    putMeFarmSetting,
    putMeFarmPickup,
    deleteMeFavorite
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
    let pickup = await userModel.findFarmPickUp(id)
    users[0].pickup = pickup;
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
    let user = await userModel.findUserByFarmId(id)
    let farm = await userModel.findFarmById(user[0].seller_id);
    let pickup = await userModel.findFarmPickUp(user[0].seller_id)
    farm[0].pickup = pickup;
    ctx.body = farm[0];
}

async function getFarmList(ctx){
    let farms = await userModel.findAllFarms();
	ctx.body = farms;
}

async function getFarmReview(ctx){
    let farm_id = ctx.params.id;
    let result = await userModel.findFarmReviews(farm_id)
    ctx.body = result;
}

async function getFarmisFavorite(ctx){
    let id = ctx.state.user.id;
    let farm_id = ctx.params.id;
    let result = await userModel.findFarmIsFavorite(id, farm_id)
    let is = result[0] ? true : false
    console.log(is)
    ctx.body = {isFarmReview: is}
}

async function getAllCoupon(ctx){
    let id = ctx.state.user.id;
    let result = await userModel.findAllCoupon(id)
    ctx.body = result;
}

async function postMeFarmPickup(ctx){
    let id = ctx.state.user.id;
    let location = ctx.request.body.location;
    let farms = await userModel.findFarmById(id);
    let result = await userModel.addFarmPickup(farms[0].farm_id, location);
	ctx.body = {success: result};
}

async function postMeFavorite(ctx){
    let id = ctx.state.user.id;
    let farm_id = ctx.params.id;
    let result = await userModel.addFavorite(id, farm_id)
    ctx.body = {success: result}
}

async function postFarmReview(ctx){
    let id = ctx.state.user.id;
    let farm_id = ctx.params.id;
    let comment = ctx.request.body.comment;
    let input = [
        farm_id,
        id,
        comment,
        new Date()
    ]
    let result = await userModel.addFarmReview(input)
    ctx.body = {success: result}
}

async function postCoupon(ctx){
    let id = ctx.state.user.id;
    let user_id = ctx.request.body.buyer_id;
    let amount = Number(ctx.request.body.amount);
    let farm = await userModel.findFarmById(id);
    let farm_id = farm[0].farm_id;
    let result = await userModel.addCoupon([user_id, farm_id, amount])
    ctx.body = {success: result}
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


async function putMeFarmSetting(ctx){
    let id = ctx.state.user.id;
    let column = ctx.request.body.type;
    let value = ctx.request.body.value;
    let result = await userModel.updateFarmSetting(id, column, value);
    ctx.body = { success: result };
}


async function putMeFarmPickup(ctx){
    let id = ctx.state.user.id;
    let item_id = ctx.params.id;
    let column = ctx.request.body.type;
    let value = ctx.request.body.value;
    let result = await userModel.updateFarmPickup(id, column, value, item_id);
    ctx.body = { success: result };
}

async function deleteMeFavorite(ctx){
    let id = ctx.state.user.id;
    let farm_id = ctx.params.id;
    await userModel.deleteMyFavorite(id, farm_id);
    ctx.body = { success: "succes" }
}



// async function getBuyers(ctx){
// 	let buyers = await userModel.getAll('buyers');
// 	ctx.body = buyers;
// }