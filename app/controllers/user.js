const userModel = require('../models/userModel');

module.exports = {
    getBuyerById,
    getSellerById,
    getSellers,
    getBuyers
}


async function getBuyerById(ctx){
	let buyer_id = ctx.params.id;
	let buyer = await userModel.getById('buyers', buyer_id);
    ctx.body = buyer;
}

async function getSellerById(ctx){
	let seller_id = ctx.params.id;
	let seller = await userModel.getById('sellers', seller_id);
    ctx.body = seller;
}

async function getSellers(ctx){
	let sellers = await userModel.getAll('sellers');
	ctx.body = sellers;
    
}

async function getBuyers(ctx){
	let buyers = await userModel.getAll('buyers');
	ctx.body = buyers;
    
}