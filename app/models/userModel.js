const db = require('../utils/database')

const users = {

	async findUserById(id) {
		let _sql = 'SELECT * FROM users WHERE id = ?';
		let buyer = await db.query(_sql, id);
		return buyer;
	},
	
	async findFavoriteFarms(id) {
		let _sql = 'SELECT f.id, f.farm_id FROM favorite f WHERE f.buyer_id = ?';
		let farms = await db.query(_sql, id);
		return farms;
	},

	async findFarmById(id) {
		let _sql = `SELECT * FROM users u
					INNER JOIN farms f ON u.id = f.seller_id
					WHERE u.identity = "1" AND id = ?`
		let farm = await db.query(_sql, id);
		return farm;
	},

	async findAllFarms() {
		let _sql = `SELECT u.id, u.display_name, u.phone_number, u.address, u.profile_pic_url, f.id AS farm_id 
					FROM users u
					INNER JOIN farms f ON u.id = f.seller_id
					WHERE u.identity = "1"`;
		let farms = await db.query(_sql);
		return farms;
	},

	async updateUser(id, data, imgURL){
		if(imgURL){
			data.push(imgURL);
			data.push(id);
			let _sql = `UPDATE users 
						SET display_name = ?, address = ?, phone_number = ?, profile_pic_url = ?
						WHERE id = ?`
			let result = await db.query(_sql, data);
			return result;
		} else {
			data.push(id);
			let _sql = `UPDATE users 
						SET display_name = ?, address = ?, phone_number = ?
						WHERE id = ?`
			let result = await db.query(_sql, data);
			return result;
		}

	}

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