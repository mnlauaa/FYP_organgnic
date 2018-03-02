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
	let product_list = await productModel.getAllProducts();
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