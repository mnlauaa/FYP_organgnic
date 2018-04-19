const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const config = require('../../config')

module.exports = {
	getMyShoppingCart,
	postMyShoppingCart,
	getOederById,
	getOrderPerDayById,
	getMyOrder,
	getMeDebts,
	getBuyerOrder,
	getSellerOrder,
	postOrder,
	postTransition,
	putOrder,
	putTransition,
	deleteOrder,
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
	let id = ctx.state.user.id;
	let order_id = ctx.params.id;
	order = await orderModel.findFullOrderById(id, order_id)
	for(let i = 0; i < orders.length; i++){
		let transaction = await orderModel.findAllTransacionById(order[i].id)
		order[i].transaction = transaction
	}
	ctx.body = order[0];
}

async function getOrderPerDayById(ctx){
	let id =ctx.state.user.id;
	let result = await userModel.findFarmById(id);
	let farm_id = result[0].farm_id;
	
	let orders = await orderModel.countOrderPerDayById(farm_id);
	ctx.body = orders;
}
async function getMeDebts(ctx) {
	let user_id = ctx.state.user.id
	let role = ctx.state.user.identity;
	let debt = await orderModel.findMyFullOrder(user_id, role, 5)
	console.log(debt)
	ctx.body = debt
}

async function getMyOrder(ctx) {
	let id = ctx.state.user.id;
	let role = ctx.state.user.identity;
	let orders = await orderModel.findMyFullOrder(id, role, 6);
	for(let i = 0; i < orders.length; i++){
		let transaction = await orderModel.findAllTransacionById(orders[i].id)
		orders[i].transaction = transaction
	}
	ctx.body = orders;
}

async function getBuyerOrder(ctx){
	let id = ctx.state.user.id;
	orders = await orderModel.getAllBuyerOrder(id)
	for(let i = 0; i < orders.length; i++){
		let transaction = await orderModel.findAllTransacionById(orders[i].id)
		orders[i].transaction = transaction
	}
	ctx.body = orders;
}

async function getSellerOrder(ctx){
	let id = ctx.state.user.id;
	console.log(id)
	orders = await orderModel.getAllSellerOrder(id)
	for(let i = 0; i < orders.length; i++){
		let transaction = await orderModel.findAllTransacionById(orders[i].id)
		orders[i].transaction = transaction
	}
	console.log(orders)
	ctx.body = orders;
}

async function postOrder(ctx) {

}

async function postTransition(ctx) {
	let user_id = ctx.state.user.id
	let input = [
		ctx.params.id,
		ctx.request.body.product_id,
		ctx.request.body.qty
	]
	console.log('postTransition', input)
	let result = await orderModel.CreateTeansactions(input)
	ctx.body = {success: result}
}

async function putOrder(ctx) {
	let id = ctx.state.user.id;
	let role = ctx.state.user.identity;
	console.log(role)
	let order_status = Number(ctx.req.body.status);
	let order_id = ctx.params.id;
	if(role == 0){
		if(order_status == 0){
			let date = new Date()
			let image_url = null
			if(ctx.req.file)
				image_url = config.SERVER.IP + 'receipt/' + ctx.req.file.filename;
			let input = [
				date,
				ctx.req.body.amount,
				ctx.req.body.pickup_method,
				ctx.req.body.pickup_location,
				ctx.req.body.payment_method,
				ctx.req.body.deposite_method || null,
				image_url || null,
				order_id,
				id
			]
			console.log("input", input)
			order = await orderModel.confirmShoppingCart(input);
			ctx.body = {success: order};
		}
		if(order_status == 1 || order_status == 3 || order_status == 4){
			console.log(ctx.req.file)
			let image_url = config.SERVER.IP + 'receipt/' + ctx.req.file.filename;
			order = await orderModel.buyerReUploadReceipt([image_url, order_id, id]);
			ctx.body = {success: order};
		}
		if(order_status == 2){
			let input = [1, order_id]
			result = await orderModel.editOrderStatus(input);
			ctx.body = {success: result};
		}
		if(order_status == 5){
			let image_url = config.SERVER.IP + 'receipt/' + ctx.req.file.filename;
			order = await orderModel.buyerReUploadReceipt([image_url, order_id, id]);
			
			let input = [5, order_id]
			result = await orderModel.editOrderStatus(input);
			ctx.body = {success: result};
		}
	} else {
		if(order_status == 1){
			if(ctx.req.body.way == 'edit'){
				let input = [ctx.req.body.amount, order_id, id]
				result = await orderModel.sellerEditOrder(input);
				ctx.body = {success: result};
			} else {
				let input = [3, order_id]
				let transacions = await orderModel.findAllTransacionById(id)
				for(var i = 0; i < transacions.length; i++)
					await orderModel.sellProduct(transacions[i].product_id, transacions[i].qty);
				let result = await orderModel.editOrderStatus(input);
				ctx.body = {success: result};
			}
		}
		if(order_status == 3){
			let input = [4, order_id]
			result = await orderModel.editOrderStatus(input);
			ctx.body = {success: result};
		}
		if(order_status == 4){
			let input;
			order = await orderModel.findOrderById(order_id)
			if(order[0].payment_method == 1 && !order[0].receipt_url)
				input = [5, order_id]
			else{
				await orderModel.editOrderDate([new Date(), order_id])
				input = [6, order_id]
			}
			result = await orderModel.editOrderStatus(input);
			ctx.body = {success: result};
		}
		if(order_status == 5){
			let input = [6, order_id];
			await orderModel.editOrderDate([new Date(), order_id])
			result = await orderModel.editOrderStatus(input);
			ctx.body = {success: result};
		}
	}
}

async function putTransition(ctx) {
	let user_id = ctx.state.user.id;
	let transition_id = ctx.params.id;
	let role = ctx.state.user.identity;
	let sup_sql = null;
	console.log(ctx.request.body)
	if(ctx.request.body.qty){
		if(sup_sql)
			sup_sql = sup_sql + ", qty = " + ctx.request.body.qty + " "
		else 
			sup_sql	= "qty = " + ctx.request.body.qty + " "
	}
	if(ctx.request.body.product_id){
		if(sup_sql)
			sup_sql = sup_sql + ', product_id = ' + ctx.request.body.product_id + ' '
		else
		sup_sql	= "product_id = " + ctx.request.body.product_id + " "
	}
	result = await orderModel.updateTransition(role, user_id, transition_id, sup_sql)
	ctx.body = {result: result}
}

async function deleteOrder(ctx) {
	let order_id = ctx.params.id;
	result = await orderModel.deleteOrder(order_id);
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





