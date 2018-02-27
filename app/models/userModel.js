const db = require('../utils/database')

const users = {

	async findUserById(id) {
		let _sql = 'SELECT * FROM users WHERE id = ?';
		let buyer = await db.query(_sql, id);
		return buyer;
	},

	async findFarmById(id) {
		let _sql = `SELECT * FROM users u
					INNER JOIN farms f ON u.id = f.seller_id
					WHERE u.identity = "seller" AND id = ?`
		let farm = await db.query(_sql, id);
		return farm;
	},

	async findAllFarms() {
		let _sql = `SELECT * FROM users u
					INNER JOIN farms f ON u.id = f.seller_id
					WHERE u.identity = "seller" `;	
		let farms = await db.query(_sql);
		return farms;
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