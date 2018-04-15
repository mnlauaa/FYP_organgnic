const db = require('../utils/database')
const config = require('../../config')

const order = {
	async findMyShoppingCart(id) {
		let _sql = `SELECT o.farm_id, u.display_name, o.date, t.id AS transaction_id, t.product_id, t.qty,
						   p.name, p.qty AS products_left, p.price, p.weight, p.image_url 
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

	async findTransitionById(id) {
		let _sql = 'SELECT * FROM transactions WHERE id = ? AND active = 1';
		let result = await db.query(_sql, id);
		return result;
	},

	async findFullOrderById(id) {
		let _sql = `SELECT * FROM order_forms o 
					INNER JOIN transactions t ON o.id = t.order_id
					INNER JOIN products p ON t.product_id = p.id
					WHERE o.id = ? AND o.active = 1 AND t.active = 1`;
		let result = await db.query(_sql, id);
		return result;
	},

	async findMyFullOrder(id) {
		let _sql = `SELECT * FROM order_forms o 
		INNER JOIN transactions t ON o.id = t.order_id
		INNER JOIN products p ON t.product_id = p.id
		WHERE o.buyer_id = ? AND status <> ?`;
		let result = await db.query(_sql, [id, config.ORDER_STATUS.SHOPPING_CART]);
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

