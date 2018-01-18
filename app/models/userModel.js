const database = require('../utils/database')

const users = {

	async getAll(table) {
	let _sql= 'SELECT * FROM ?? ';
	return await database.query(_sql, [ table ]);
	},

	async getById(table, id) {
	let _sql = 'SELECT * FROM ?? WHERE id = ?';	
	return await database.query(_sql, [ table, id ]);
	}
}

module.exports = users