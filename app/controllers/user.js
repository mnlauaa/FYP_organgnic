const userModel = require('../models/userModel');

module.exports = {
    getMe,
    getUser,
    getSellerList,
    putMe
    // getBuyers
}

async function getMe(ctx){

}

async function getUser(ctx){
    let id = ctx.params.id;
    let identity =  ctx.state.user.identity;
	let users = await userModel.getUserById(id, identity);
    ctx.body = users[0];
}

async function getSellerList(ctx){
	let seller_list = await userModel.getAllSellers();
	ctx.body = seller_list;
}

async function putMe(ctx){
    
}

// async function getBuyers(ctx){
// 	let buyers = await userModel.getAll('buyers');
// 	ctx.body = buyers;
// }