const db = require('../utils/database')

const products = {

	async getProductById(id){
		let _sql = `SELECT p.id, p.farm_id, u.display_name, u.id AS seller_id, p.name, p.classification, p.qty, p.price, p.weight, 
						   p.special_price, p.special_weight, p.special_expiry,
						   (p.rating / p.rating_number) AS rating, p.last_update, p.image_url 
					FROM products p 
					INNER JOIN farms f ON f.id = p.farm_id
					INNER JOIN users u ON f.seller_id = u.id
					WHERE p.active = 1 AND p.id = ?`;
		let product = await db.query(_sql, id);
		return product
	},

	async getAllProducts(order_sql, filter_sql, keyword){
		let _sql = `SELECT p.id, p.farm_id, u.display_name, u.id AS seller_id, p.name, p.classification, p.qty, p.price, p.weight,
						   p.special_price, p.special_weight, p.special_expiry,
						   (p.rating / p.rating_number) AS rating, p.last_update, p.image_url 
					FROM products p 
					INNER JOIN farms f ON f.id = p.farm_id
					INNER JOIN users u ON f.seller_id = u.id
					WHERE p.active = 1 AND (p.name LIKE ? OR u.display_name LIKE ?)`;
		_sql = _sql + filter_sql;
		_sql = _sql + order_sql;
		let products = await db.query(_sql, [keyword, keyword]);
		return products 
	},

	async getRelatedProduct(product_class, id){
		let _sql = `SELECT p.id, p.name, u.display_name, (p.rating / p.rating_number) AS rating, p.image_url, p.classification
					FROM products p
					INNER JOIN farms f ON f.id = p.farm_id
					INNER JOIN users u ON f.seller_id = u.id
					WHERE p.active = 1 AND p.qty > 0 AND p.classification = ? AND p.id <> ?
					ORDER BY RAND()
					LIMIT 6`;
		let products = await db.query(_sql, [product_class, id]);
		return products
	},

	async getSearchResult(filter_sql, keyword){
		let _sql = `SELECT COUNT(p.id) AS num
					FROM products p 
					INNER JOIN farms f ON f.id = p.farm_id
					INNER JOIN users u ON f.seller_id = u.id
					WHERE p.active = 1 AND (p.name LIKE ? OR u.display_name LIKE ?)`;
		_sql = _sql + filter_sql;
		let num = await db.query(_sql, [keyword, keyword]);
		return num 
	},

	async getAllProductReviewById(id){
		let _sql = 'SELECT * FROM reviews WHERE product_id = ?';
		let reviews = await db.query(_sql, id);
		return reviews;
	},

	async addNewProduct(product_parms){
		let _sql = 'INSERT INTO products(farm_id, name, classification, qty, price, weight, last_update, image_url) VALUES (?)';
		let new_product = await db.query(_sql, [product_parms]);
		return new_product;
	},

	async updateProduct(product_parms, special, product_image_url, product_id, farm_id){
		let _sql = `UPDATE products SET name = ?, classification = ?, qty = ?, price = ?, weight = ?`;
		if(special)
			_sql = _sql + `, special_price = ?, special_weight = ?, special_expiry = ?`;

		_sql = _sql + `, last_update = ? `;

		if(product_image_url)
			_sql = _sql + `, image_url = ?`;
		
		_sql = _sql + `WHERE id = ? AND farm_id = ?`;
		product_parms.push(product_id);
		product_parms.push(farm_id);

		let update_product = await db.query(_sql, product_parms);
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