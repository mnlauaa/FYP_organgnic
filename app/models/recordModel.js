const db = require('../utils/database')

module.exports = record

const record = {

	async getAllRecords(){
		let _sql = 'SELECT * FROM chat_logs';
		let records = await db.query(_sql);
		return records
	},

	async getRecordById(id){
		let _sql = 'SELECT * FROM chat_logs WHERE id = ?';
		let record = await db.query(_sql, id);
		return record
	},

	async getRecordsBySender(id){
		let _sql = 'SELECT * FROM chat_logs WHERE sender_id = ?';
		let record = await db.query(_sql, id);
		return records
	}
}
