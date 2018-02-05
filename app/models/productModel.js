const db = require('../utils/database')

const products = {

	async getProductById(id){
		let _sql = 'SELECT * FROM products WHERE id = ?';
		let product = await db.query(_sql, id);
		return product
	},

	async getAllProducts(){
		let _sql = 'SELECT * FROM products';
		let products = await db.query(_sql);
		return products 
	},

	async getOrderFormById(id){
		let _sql = 'SELECT * FROM order_forms WHERE id = ?';
		let order_form = await db.query(_sql, id);
		return order_form 
	},

	async getOrderForms(){
		let _sql = 'SELECT * FROM order_forms';
		let order_forms = await db.query(_sql);
		return order_forms
	},

	async addNewOrderForm(bid, sid){
		let _sql = 'INSERT INTO order_forms(buyer_id, seller_id) VALUES("?", "?")';
		let order_form = await db.query(_sql, bid, sid);
		return order_form;
	}

}

module.exports = products