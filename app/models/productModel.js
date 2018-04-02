const db = require('../utils/database')

const products = {

	async getProductById(id){
		let _sql = 'SELECT * FROM products WHERE id = ?';
		let product = await db.query(_sql, id);
		return product
	},

	async getAllProducts(sorting_sql, keyword){
		let _sql = `SELECT p.id, p.farm_id, u.display_name, p.name, p.qty, p.price, p.weight, (p.rating / p.rating_number) AS rating, p.last_update, p.image_url 
					FROM products p 
					INNER JOIN farms f ON f.id = p.farm_id
					INNER JOIN users u ON f.seller_id = u.id
					WHERE p.active = 1 AND (p.name LIKE ? OR u.display_name LIKE ?)`;
		_sql = _sql + sorting_sql
		let products = await db.query(_sql, [keyword, keyword]);
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

	async updateProduct(id, farm_id, name, qty, price, weight, rating, rating_number, image_url){
		let _sql = `UPDATE products 
						SET farm_id=?, name=?, qty=?, price=?, weight=?, rating=?, rating_number=?, image_url=? 
						WHERE id = ?`;

		let update_product =await db.query(_sql, [farm_id, name, qty, price, weight, rating, rating_number, image_url, id]);
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