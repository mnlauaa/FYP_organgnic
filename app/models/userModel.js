const db = require('../utils/database')

const users = {

	async getBuyerById(id) {
		let _sql = 'SELECT * FROM buyers WHERE id = ?';
		let buyer = await db.query(_sql, id);
		return buyer
	},

	async getSellerById(id) {
		let _sql = 'SELECT * FROM sellers WHERE id = ?';
		let seller = await db.query(_sql, id);
		return seller
	},

	async getAllSellers() {
		let _sql = 'SELECT * FROM sellers';	
		let sellers = await db.query(_sql);
		return sellers
	},


	// async getAll(table) {
	// let _sql= 'SELECT * FROM ?? ';
	// return await database.query(_sql, [ table ]);
	// },

	// async getById(table, id) {
	// let _sql = 'SELECT * FROM ?? WHERE id = ?';	
	// return await db.query(_sql, [ table, id ]);
	// }
}

module.exports = users