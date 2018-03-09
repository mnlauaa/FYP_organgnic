const productModel = require('../models/productModel');

module.exports = {
    getProductList,
	getProductById,
	getProductReview,
	postProduct,
	putProduct
    // getOrderFormById,
    // getOrderForms,
    // postOrderForms
}

async function getProductList(ctx) {
	let filter = ctx.query;
	let product_list = await productModel.getAllProducts(filter);
	ctx.body = product_list;
}

async function getProductById(ctx) {
	let id = ctx.params.id;
	let product = await productModel.getProductById(id);
	ctx.body = product;
}

async function getProductReview(ctx) {
	let id = ctx.params.id;
	let review = await productModel.getAllProductReviewById(id);
	ctx.body = review;
}

async function postProduct(ctx) {
	let product_parms = [
		ctx.request.body.farm_id,
		ctx.request.body.name,
		ctx.request.body.qty,
		ctx.request.body.price,
		ctx.request.body.weight
	]
	let product = await productModel.addNewProduct(product_parms);
}

async function putProduct(ctx) {
	let id = ctx.request.body.id;
	let target = await productModel.getProductById(id);
	if(!target){
		console.log("target not exisit!");
		return;
	}
	let farm_id =ctx.request.body.farm_id;
	let name = ctx.request.body.name;
	let qty = ctx.request.body.qty;
	let	price = ctx.request.body.price;
	let	weight = ctx.request.body.weight;
	let	rating = ctx.request.body.rating;
	let	rating_number = ctx.request.body.rating_number;
	let	image_url = ctx.request.body.image_url;

	let update_product = await productModel.updateProduct(id, farm_id, name, qty, price, weight, rating, rating_number, image_url);
	ctx.body = "Successfully update!";
	
}

// async function getOrderFormById(ctx){
// 	let id = ctx.params.id;
// 	let order_form = await productModel.getOrderFormById(id);
// 	ctx.body = order_form;
// }

// async function getOrderForms(ctx){
// 	let order_form_list = await productModel.getOrderForms();
// 	ctx.body = order_form_list;
// }

// async function postOrderForms(ctx){
// 	let seller_id = ctx.request.body.seller_id;
// 	let buyer_id = ctx.request.body.buyer_id;
// 	let new_order_form = await productModel.addNewOrderForm(buyer_id, seller_id);
// }