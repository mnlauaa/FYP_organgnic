const orderModel = require('../models/orderModel');
const config = require('../../config')

module.exports = {
	getMyShoppingCart,
	postMyShoppingCart,
	getOederById,
	getMyOrder,
	postOrder,
	putOrder
}

async function getMyShoppingCart(ctx) {
	let id = ctx.state.user.id;
	let shopping_cart = await orderModel.findMyShoppingCart(id);
	ctx.body = shopping_cart;
}

async function postMyShoppingCart(ctx) {
	let user_id = ctx.state.user.id,
		farm_id = ctx.request.body.farm_id;

	let shoppping_cart = await orderModel.findShoppingCartExist(user_id, farm_id);

	if(!shoppping_cart[0]){
		let today = new Date();
		let input = [
			farm_id,
			user_id,
			today,
			config.ORDER_STATUS.SHOPPING_CART
		]
		let result = await orderModel.CreateOrder(input);
		shoppping_cart = await orderModel.findOrderById(result.insertId);
	}

	let input = [
		shoppping_cart[0].id,
		ctx.request.body.product_id,
		ctx.request.body.qty
	]
	await orderModel.CreateTeansactions(input);
	ctx.body = "success";
}

async function getOederById(ctx) {
	let id = ctx.params.id;
	order = await orderModel.findFullOrderById(id);
	ctx.body = order[0];
}

async function getMyOrder(ctx) {
	let id = ctx.state.user.id;
	order = await orderModel.findMyFullOrder(id);
	ctx.body = order;
}

async function postOrder(ctx) {

}

async function putOrder(ctx) {
	
}

// async function getChatLogs(ctx){
// 	let chat_logs = await recordModel.getAllRecords();
// 	ctx.body = chat_logs;
// }

// async function getChatLogsById(ctx){
// 	let id = ctx.params.id;
// 	let chat_log = await recordModel.getRecordById(id);
// 	ctx.body = chat_log;
// }

// async function getChatLogsBySender(ctx){
// 	let id = ctx.params.id;
// 	let chat_logs = await recordModel.getRecordById(id);
// 	ctx.body = chat_logs;
// }

// async function postChatLogs(ctx) {
    
// }






