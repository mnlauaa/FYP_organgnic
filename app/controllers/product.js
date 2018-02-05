module.exports = {
    getProducts,
    getProductById,
    getOrderForms,
    postOrderForms
}

async function getProducts(ctx){
	let product_list = await productModel.getAllProducts();
	ctx.body = product_list;
}

async function getProductById(ctx){
	let id = ctx.params.id;
	let product = await productModel.getProductById(id);
	ctx.body = product;
}

async function getOrderFormById(ctx){
	let id = ctx.params.id;
	let order_form = await productModel.getOrderFormById(id);
	ctx.body = order_form;
}

async function getOrderForms(ctx){
	let order_form_list = await productModel.getOrderForms();
	ctx.body = order_form_list;
}

async function postOrderForms(ctx){
	
}