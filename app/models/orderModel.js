const db = require('../utils/database')
const config = require('../../config')

const order = {
	async findMyShoppingCart(id) {
		let _sql = `SELECT o.farm_id, u.display_name, o.date, t.id AS transaction_id, t.product_id, t.qty,
						   p.name, p.qty AS products_left, p.price, p.weight, 
						   p.special_price, p.special_weight, p.special_expiry, p.image_url ,
						   o.status, o.id AS order_id
					FROM order_forms o 
					INNER JOIN transactions t ON o.id = t.order_id
					INNER JOIN products p ON t.product_id = p.id
					INNER JOIN farms f ON o.farm_id = f.id
					INNER JOIN users u ON u.id = f.seller_id
					WHERE o.buyer_id = ? AND o.status = ? AND o.active = 1 AND t.active = 1 AND p.active = 1
					ORDER BY o.farm_id ASC`;
		let result = await db.query(_sql, [id, config.ORDER_STATUS.SHOPPING_CART]);
		return result;
	}, 

	async findShoppingCartExist(user_id, farm_id) {
		let _sql = 'SELECT * FROM order_forms WHERE buyer_id = ? AND farm_id = ? AND status = ? AND active = 1'
		let result = await db.query(_sql, [user_id, farm_id, config.ORDER_STATUS.SHOPPING_CART]);
		return result;
	},

	async findOrderById(id) {
		let _sql = 'SELECT * FROM order_forms WHERE id = ? AND active = 1';
		let result = await db.query(_sql, id);
		return result;
	},

	async countTransitionById(id) {
		let _sql = 'SELECT COUNT(*) AS num FROM transactions WHERE order_id = ? AND active = 1';
		let result = await db.query(_sql, id);
		return result;
	},

	async countOrderPerDayById(id){
		let _sql =`SELECT COUNT(CAST(date AS DATE)) AS 'number_of_order', CAST(date AS DATE) AS 'date_of_order' 
				   FROM order_forms 
				   WHERE farm_id = ? AND active = 1
				   GROUP BY CAST(date AS DATE)`;
		let result = await db.query(_sql, id);
		return result;
	},

	async findTransitionById(id) {
		let _sql = 'SELECT * FROM transactions WHERE id = ? AND active = 1';
		let result = await db.query(_sql, id);
		return result;
	},

	async findFullOrderById(id, order_id) {
		let _sql = `SELECT o.*, u.display_name, u.id AS buyer_id, u.profile_pic_url, f.bank_deposit_info 
					FROM order_forms o
					INNER JOIN farms f ON o.farm_id = f.id
					INNER JOIN users u ON o.buyer_id = u.id
					WHERE f.seller_id = ? AND o.id = ? AND o.active = 1 AND o.status = 1`;
		let result = await db.query(_sql, [id, order_id]);
		return result;
	},

	async getAllBuyerOrder(id) {
		let _sql = `SELECT o.*, u.display_name, u.id AS seller_id, u.profile_pic_url, f.bank_deposit_info 
					FROM order_forms o
					INNER JOIN farms f ON o.farm_id = f.id
					INNER JOIN users u ON f.seller_id = u.id
					WHERE o.buyer_id = ? AND o.active = 1 AND 
							(o.status >= 1 AND o.status <= 5)`;
		let result = await db.query(_sql, id);
		return result;
	},

	async getAllSellerOrder(id) {
		let _sql = `SELECT o.*, u.display_name, u.id AS buyer_id, u.profile_pic_url, f.bank_deposit_info 
					FROM order_forms o
					INNER JOIN farms f ON o.farm_id = f.id
					INNER JOIN users u ON o.buyer_id = u.id
					WHERE f.seller_id = ? AND o.active = 1 AND (o.status = 1 OR o.status = 3 OR o.status = 4 OR o.status = 5)`;
		let result = await db.query(_sql, id);
		return result;
	},


	async findMyFullOrder(id, role, status) {
		let _sql =`SELECT o.*, u.display_name, u.id AS seller_id, u.profile_pic_url, f.bank_deposit_info 
				   FROM order_forms o
				   INNER JOIN farms f ON o.farm_id = f.id
				   INNER JOIN users u ON f.seller_id = u.id `
		if(role == 0)
			_sql = _sql + `WHERE o.buyer_id = ? AND o.active = 1 AND o.status = ?`;
		else
			_sql = _sql + `WHERE f.seller_id = ? AND o.active = 1 AND o.status = ?`;
		let result = await db.query(_sql, [id, status]);
		return result;
	},

	async findAllTransacionById(id){
		let _sql = `SELECT t.id AS transaction_id, t.product_id, t.qty, p.name, 
						   IF(p.special_expiry > NOW(), p.special_price, p.price) AS price, p.weight, 
						   p.image_url
					FROM transactions t
					INNER JOIN products p ON t.product_id = p.id
					WHERE t.order_id = ? AND t.active = 1`;
		let result = await db.query(_sql, id)
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

	async updateTransition(role, user_id, transition_id, sup_sql) {
		let _sql = `UPDATE transactions t
					INNER JOIN order_forms o ON o.id = t.order_id
					INNER JOIN farms f ON f.id = o.farm_id
					SET `
		_sql = _sql + sup_sql;
		_sql = _sql + `WHERE t.id = ? `
		if(role == 0)
			_sql += "AND o.buyer_id = ?"
		else
			_sql += "AND f.seller_id = ?"
			console.log(_sql)
		let result = await db.query(_sql, [transition_id, user_id]);
		return result;
	},

	async confirmShoppingCart(input) {
		let _sql = `UPDATE order_forms
					SET date = ?, amount =?, pickup_method = ?, pickup_location = ?, payment_method = ?, deposite_method = ?, receipt_url = ?, status = 1
					WHERE id = ? AND buyer_id = ?`
		let result = await db.query(_sql, input);
		return result;
	},

	async buyerReUploadReceipt(input) {
		let _sql = `UPDATE order_forms SET receipt_url = ? WHERE id = ? AND buyer_id = ?`
		let result = await db.query(_sql, input);
		return result;
	},

	async sellerEditOrder(input) {
		let _sql = `UPDATE order_forms o
					INNER JOIN farms f ON f.id = o.farm_id
					SET o.amount = ?, o.status = 2
					WHERE o.id = ? AND f.seller_id = ?`
		let result = await db.query(_sql, input);
		return result;
	},

	async editOrderStatus(input) {
		let _sql = `UPDATE order_forms o
					SET o.status = ?
					WHERE o.id = ?`
		let result = await db.query(_sql, input);
		return result;
	},

	async editOrderDate(input) {
		let _sql = `UPDATE order_forms o
					SET date = ?
					WHERE id = ?`
		let result = await db.query(_sql, input);
		return result;
	},

	async sellProduct(id, qty) {
		let _sql = `UPDATE products
					SET qty = qty - ?
					WHERE id = ?`
		let result = await db.query(_sql, [qty, id]);
		return result;
	},

	async deleteOrder(id) {
		let _sql = `UPDATE order_forms SET active = 0 WHERE id = ? `
		let result = await db.query(_sql, id);
		return result;
	},

	async deleteTeansactions(role, user_id, transition_id) {
		let _sql = `UPDATE transactions t
					INNER JOIN order_forms o ON o.id = t.order_id
					INNER JOIN farms f ON f.id = o.farm_id
					SET t.active = 0 
					WHERE t.id = ? `
		if(role == 0)
			_sql += "AND o.buyer_id = ?"
		else
			_sql += "AND f.seller_id = ?"
		let result = await db.query(_sql, [transition_id, user_id]);
		return result;
	}
}

module.exports = order

