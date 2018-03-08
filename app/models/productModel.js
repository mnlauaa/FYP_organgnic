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

	async getAllProductReviewById(id){
		let _sql = 'SELECT * FROM reviews WHERE product_id = ?';
		let reviews = await db.query(_sql, id);
		return reviews;
	},

	async addNewProduct(product_parms){
		let _sql = 'INSERT INTO products(farm_id, name, qty, price, weight) VALUES (?)';
		let new_product = await db.query(_sql, [product_parms]);
		return new_product;
	},
	async updateProduct(id, update_parms){
		let _sql = `UPDATE products 
						SET farm_id=?, name=?, qty=?, price=?, weight=?, rating=?, rating_number=?, image_url=? 
						WHERE id = ?`;

		let update_product =await db.query(_sql, [update_parms, id]);
		return update_product;
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