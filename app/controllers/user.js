const userModel = require('../models/userModel');

module.exports = {
    getMe,
    getBuyer,
    getSeller,
    getSellerList,
    putMe
    // getBuyers
}

async function getMe(ctx){

}

async function getBuyer(ctx){
	let buyer_id = ctx.params.id;
	let buyer = await userModel.getBuyerById(buyer_id);
    ctx.body = buyer[0];
}

async function getSeller(ctx){
	let seller_id = ctx.params.id;
	let seller = await userModel.getSellerById(seller_id)
    ctx.body = seller[0];
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