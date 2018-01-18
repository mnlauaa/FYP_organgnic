const userModel = require('../models/userModel');

module.exports = {
    getBuyer,
    getSeller,
    getSellerList
    // getBuyers
}


async function getBuyer(ctx){
	let buyer_id = ctx.params.id;
	let buyer = await userModel.getBuyerById(buyer_id);
    ctx.body = buyer;
}

async function getSeller(ctx){
	let seller_id = ctx.params.id;
	let seller = await userModel.getSellerById(seller_id)
    ctx.body = seller;
}

async function getSellerList(ctx){
	let seller_list = await userModel.getAllSellers();
	ctx.body = seller_list;
    
}

// async function getBuyers(ctx){
// 	let buyers = await userModel.getAll('buyers');
// 	ctx.body = buyers;
// }