const db = require('../utils/database')
const config = require('../../config')

const order = {
	async findMyShoppingCart(id) {
		let _sql = `SELECT * FROM order_forms o 
					INNER JOIN transactions t ON o.id = t.order_id
					INNER JOIN products p ON t.product_id = p.id
					WHERE o.buyer_id = ?`;
		let result = await db.query(_sql, id);
		return result;
	}, 

	async findShoppingCartExist(user_id, farm_id) {
		let _sql = 'SELECT * FROM order_forms WHERE buyer_id = ? AND farm_id = ? AND status = ?'
		let result = await db.query(_sql, [user_id, farm_id, config.ORDER_STATUS.SHOPPING_CART]);
		return result;
	},

	async CreateOrder(input) {
		let _sql = 'INSERT INTO order_forms (farm_id, buyer_id, date, status) VALUES(?)';
		let result = await db.query(_sql, [input]);
		return result;
	},

	async CreateTeansactions(input) {
		let _sql = 'INSERT INTO transactions (order_id, product_id, qty) VALUES(?)';
		let result = await db.query(_sql, [input]);
		return result;
	},

	async findOrderById(id) {
		let _sql = 'SELECT * FROM order_forms WHERE id = ?';
		let result = await db.query(_sql, id);
		return result;
	}

	// async getAllRecords(){
	// 	let _sql = 'SELECT * FROM chat_logs';
	// 	let records = await db.query(_sql);
	// 	return records
	// },

	// async getRecordById(id){
	// 	let _sql = 'SELECT * FROM chat_logs WHERE id = ?';
	// 	let record = await db.query(_sql, id);
	// 	return record
	// },

	// async getRecordsBySender(id){
	// 	let _sql = 'SELECT * FROM chat_logs WHERE sender_id = ?';
	// 	let record = await db.query(_sql, id);
	// 	return records
	// }
}

module.exports = order

