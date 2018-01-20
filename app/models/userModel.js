const db = require('../utils/database')

const users = {

	async getUserById(id, identity) {
		let _sql = 'SELECT * FROM users WHERE id = ?, identity = ?';
		let buyer = await db.query(_sql, [id, identity]);
		return buyer
	},

	async getAllSellers() {
		let _sql = 'SELECT * FROM users WHERE identity = "seller"';	
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