const db = require('../utils/database')

const users = {

	async findUserById(id) {
		let _sql = 'SELECT * FROM users WHERE id = ?';
		let buyer = await db.query(_sql, id);
		return buyer;
	},
	
	async findFavoriteFarms(id) {
		let _sql = `SELECT fa.farm_id, u.display_name, u.phone_number, u.address, u.profile_pic_url
					FROM favorite fa
					INNER JOIN farms f ON fa.farm_id = f.id
					INNER JOIN users u ON f.seller_id = u.id
					WHERE fa.buyer_id = ? AND fa.active = 1`;
		let farms = await db.query(_sql, id);
		return farms;
	},

	async findFarmById(id) {
		let _sql = `SELECT u.id, u.display_name, u.phone_number, u.address, u.profile_pic_url, u.identity,
							f.id AS farm_id, f.about_intro, f.banner_pic_url, f.shipping_cost, f.shipping_margin,
							f.home_additional_cost, f.bank_deposit_info, f.margin_on, f.coupon_on, home_on, bank_deposit_on, pay_after_on
					FROM users u
					INNER JOIN farms f ON u.id = f.seller_id
					WHERE u.identity = "1" AND u.id = ?`
		let farm = await db.query(_sql, id);
		return farm;
	},

	async findFarmPickUp(id){
		let _sql = `SELECT fp.id, fp.location, fp.func_on 
					FROM farms_pickup fp
					INNER JOIN farms f ON f.id = fp.farm_id
					WHERE fp.active = 1 AND f.seller_id = ?`
		let pickup = await db.query(_sql, id)
		return pickup;

	},

	async findAllFarms() {
		let _sql = `SELECT u.id, u.display_name, u.phone_number, u.address, u.profile_pic_url, f.id AS farm_id 
					FROM users u
					INNER JOIN farms f ON u.id = f.seller_id
					WHERE u.identity = "1"`;
		let farms = await db.query(_sql);
		return farms;
	},

	async addFarmPickup(farm_id, location){
		let _sql = `INSERT INTO farms_pickup (farm_id, location) VALUES (?)`
		let result = await db.query(_sql, [[farm_id, location]]);
		return result;
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

	},

	async updateFarm(id, data, bannerURL){
		let _sql = `UPDATE farms SET about_intro = ?`

		if(bannerURL){
			_sql = _sql + ', banner_pic_url = ?'
			data.push(bannerURL)
		}

		_sql = _sql + ' WHERE seller_id = ?'
		data.push(id);
		let result = await db.query(_sql, data);
		return result;
	},

	
	async updateFarmSetting(id, column, value){
		let _sql = "UPDATE farms SET ?? = ? WHERE active = 1 AND seller_id = ?"
		let result = await db.query(_sql, [column, value, id]);
		return result;
	},

	async updateFarmPickup(id, column, value, item_id){
		console.log(id + "   " + column + "   " + value + "   " + item_id)
		let _sql = `UPDATE farms_pickup fp 
					INNER JOIN farms f ON f.id = fp.farm_id
					SET fp.?? = ?
					WHERE fp.active = 1 AND f.seller_id = ? AND fp.id = ?`
		let result = await db.query(_sql, [column, value, id, item_id]);
		return result;
	},

	async deleteMyFavorite(id, farm_id){
		let _sql = `UPDATE favorite SET active = 0 WHERE buyer_id = ? AND farm_id = ?`
		let result = await db.query(_sql, [id, farm_id])
		return result;
	}

}

module.exports = users
