const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
const config = require('../../config')

module.exports = {
    getProductList,
	getProductById,
	getRelatedProduct,
	getProductReview,
	postProduct,
	putProduct
    // getOrderFormById,
    // getOrderForms,
    // postOrderForms
}

async function getProductList(ctx) {
	let sorting = Number(ctx.query.sorting) || null;
	let keyword = ctx.query.keyword || null;
	let prod_class = ctx.query.class || null;
	let brand = ctx.query.brand || null;
	let price_below = ctx.query.price_below || null;
	let price_above = ctx.query.price_above || null;

	let order_sql;
	let filter_sql = '';
	console.log(ctx.query);

	switch(sorting){
		case 1:
			order_sql = " ORDER BY p.name DESC"
			break;
		case 2:
			order_sql = " ORDER BY (p.price/p.weight) ASC"
			break;
		case 3:
			order_sql = " ORDER BY (p.price/p.weight) DESC"
			break;
		case 4:
			order_sql = " ORDER BY (p.rating/p.rating_number) DESC"
			break;
		case 5:
			order_sql = " ORDER BY p.last_update DESC"
			break;
		default:
			order_sql = " ORDER BY p.name ASC"
			break;
	}

	if(keyword)
		keyword = '%' + keyword + '%'
	else
		keyword = '%%'

	if(brand){
		filter_sql = filter_sql + ' AND (p.farm_id = ' + brand[0];
		for(var i = 1; i < brand.length; i++)
			filter_sql = filter_sql + " OR p.farm_id = " + brand[i];
		filter_sql = filter_sql + ')'
	}

	if(prod_class){
		filter_sql = filter_sql + ' AND (p.classification = ' + prod_class[0];
		for(var i = 1; i < prod_class.length; i++)
			filter_sql = filter_sql + " OR p.classification = " + prod_class[i];
		filter_sql = filter_sql + ')'
	}
	
	if(price_below)
		filter_sql = filter_sql + " AND p.price < " + price_below;
	
	if(price_above)
		filter_sql = filter_sql + " AND p.price >" + price_above

	
	console.log(filter_sql)
	let product_list = await productModel.getAllProducts(order_sql, filter_sql, keyword);
	let result_num = await productModel.getSearchResult(filter_sql, keyword)
	ctx.body = {product_list: product_list, result_num: result_num[0].num};
}

async function getProductById(ctx) {
	let id = ctx.params.id;
	let product = await productModel.getProductById(id);
	ctx.body = product[0];
}

async function getRelatedProduct(ctx) {
	let product_class = ctx.query.product_class
	let id = ctx.query.id;
	let products = await productModel.getRelatedProduct(product_class, id);
	ctx.body = products;
}

async function getProductReview(ctx) {
	let id = ctx.params.id;
	let review = await productModel.getAllProductReviewById(id);
	ctx.body = review;
}

async function postProduct(ctx) {
	let id = ctx.state.user.id;
	let result = await userModel.findFarmById(id);
	let farm_id = result[0].farm_id;

	let product_image_url;
	if(ctx.req.file)
		product_image_url = config.SERVER.IP + 'product/' + ctx.req.file.filename;

	let now = new Date();
	let product_parms = [
		farm_id,
		ctx.req.body.name,
		ctx.req.body.classification,
		ctx.req.body.qty,
		ctx.req.body.price,
		ctx.req.body.weight,
		now,
		product_image_url
	]
	let product = await productModel.addNewProduct(product_parms);
	ctx.body = {success: product};
}

async function putProduct(ctx) {
	let id = ctx.state.user.id;
	let product_id = ctx.params.id;
	let result = await userModel.findFarmById(id);
	let farm_id = result[0].farm_id;
	let special = false;
	let now = new Date(); 

	let product_image_url = null;
	if(ctx.req.file)
		product_image_url = config.SERVER.IP + 'product/' + ctx.req.file.filename;

	let product_parms = [
		ctx.req.body.name,
		ctx.req.body.classification,
		ctx.req.body.qty,
		ctx.req.body.price,
		ctx.req.body.weight
	]

	if(ctx.req.body.special_price && ctx.req.body.special_weight && ctx.req.body.special_expiry){
		special = true;
		product_parms.push(ctx.req.body.special_price);
		product_parms.push(ctx.req.body.special_weight);
		product_parms.push(ctx.req.body.special_expiry);
	}

	product_parms.push(now);

	let update_product = await productModel.updateProduct(product_parms, special, product_image_url, product_id, farm_id);
	ctx.body = {success: update_product};
	
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