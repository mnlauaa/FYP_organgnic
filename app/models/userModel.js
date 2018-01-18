const database = require('../utils/database')

const users = {

	async getAll(table) {
	let users = await database.selectAll(table);
	return users;
	},

	async getById(table, id) {
	let dataList = await database.getDataById(table, id);
	return dataList;
	}
}

module.exports = users