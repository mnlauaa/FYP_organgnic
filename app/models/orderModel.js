const db = require('../utils/database')
const config = require('../../config')

const order = {
	async findMyShoppingCart(id) {
		let _sql = `SELECT o.farm_id, u.display_name, o.date, t.id AS transaction_id, t.product_id, t.qty,
						   p.name, p.qty AS products_left, p.price, p.weight, p.image_url FROM order_forms o 
					INNER JOIN transactions t ON o.id = t.order_id
					INNER JOIN products p ON t.product_id = p.id
					INNER JOIN farms f ON o.farm_id = f.id
					INNER JOIN users u ON u.id = f.seller_id
					WHERE o.buyer_id = ? AND o.status = ?
					ORDER BY o.farm_id ASC`;
		let result = await db.query(_sql, [id, config.ORDER_STATUS.SHOPPING_CART]);
		return result;
	}, 

	async findShoppingCartExist(user_id, farm_id) {
		let _sql = 'SELECT * FROM order_forms WHERE buyer_id = ? AND farm_id = ? AND status = ?'
		let result = await db.query(_sql, [user_id, farm_id, config.ORDER_STATUS.SHOPPING_CART]);
		return result;
	},

	async findOrderById(id) {
		let _sql = 'SELECT * FROM order_forms WHERE id = ?';
		let result = await db.query(_sql, id);
		return result;
	},

	async findFullOrderById(id) {
		let _sql = `SELECT * FROM order_forms o 
					INNER JOIN transactions t ON o.id = t.order_id
					INNER JOIN products p ON t.product_id = p.id
					WHERE o.id = ?`;
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
	}
}

module.exports = order

