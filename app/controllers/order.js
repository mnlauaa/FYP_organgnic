const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const config = require('../../config')

module.exports = {
	getMyShoppingCart,
	postMyShoppingCart,
	getOederById,
	getMyOrder,
	postOrder,
	putOrder,
	putTransition,
	deleteTransition,
}

async function getMyShoppingCart(ctx) {
	let id = ctx.state.user.id;
	let shopping_cart = await orderModel.findMyShoppingCart(id);	
	let temp_arry = [];

	if(shopping_cart[0]){
		temp_arry[0] = {};
		temp_arry[0].productList = [];
		let x = shopping_cart[0].farm_id;
		let y = 0;	

		let user = await userModel.findUserByFarmId(x)
		let farm = await userModel.findFarmById(user[0].seller_id);
		farm[0].pickup = await userModel.findFarmPickUp(user[0].seller_id)
		temp_arry[0].farm = farm[0];

		for(var i = 0; i < shopping_cart.length; i++){
			if(shopping_cart[i].farm_id != x){
				y++;
				x = shopping_cart[i].farm_id;
				temp_arry[y] = {}
				temp_arry[y].productList = [];

				user = await userModel.findUserByFarmId(x)
				farm = await userModel.findFarmById(user[0].seller_id);
				farm[0].pickup = await userModel.findFarmPickUp(user[0].seller_id)
				temp_arry[y].farm = farm[0];
			}
			temp_arry[y].productList.push(shopping_cart[i])
		}
	}	
	ctx.body = temp_arry;
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
	ctx.body = {success: "success"};
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
	console.log(ctx.req.body);
	let id = ctx.state.user.id;
	let role = ctx.state.user.identity;
	let order_status = ctx.req.body.status;
	let order_id = ctx.params.id;
	if(role == 0){
		if(order_status == 0){
			let date = new Date()
			let input = [
				date,
				ctx.req.body.pickup_method,
				ctx.req.body.pickup_location,
				ctx.req.body.payment_method,
				ctx.req.body.deposite_method || null,
				ctx.req.file || null,
				order_id,
				id
			]
			console.log("input", input)
			order = await orderModel.confirmShoppingCart(input);
			ctx.body = {success: order};
		}
	}
}

async function putTransition(ctx) {
	let user_id = ctx.state.user.id;
	let transition_id = ctx.params.id;
	let role = ctx.state.user.identity;
	let sup_sql = null;
	if(ctx.request.body.qty){
		if(sup_sql){
			sup_sql = sup_sql + ', '
		}
		sup_sql	= "qty = " + ctx.request.body.qty + " "
	}
	result = await orderModel.updateTransition(role, user_id, transition_id, sup_sql)
	ctx.body = {result: result}
}

async function deleteTransition(ctx) {
	let user_id = ctx.state.user.id;
	let transition_id = ctx.params.id;
	let role = ctx.state.user.identity;
	let del_order = false;

	if(role == 0){
		let t = await orderModel.findTransitionById(transition_id);
		let num = await orderModel.countTransitionById(t[0].order_id);
		console.log(num[0]);
		if(num[0].num == 1){
			await orderModel.deleteOrder(t[0].order_id);
			del_order = true
		}
	}
	result = await orderModel.deleteTeansactions(role, user_id, transition_id)
	ctx.body = {del_order: del_order}
}





