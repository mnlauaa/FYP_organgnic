const db = require('../utils/database')

const news = {
    async findNewsById(id) {
		let _sql = 'SELECT * FROM news WHERE id = ?';
		let news = await db.query(_sql, id);
		return news;
    },
    
    async findAllNews() {
		let _sql = 'SELECT * FROM news';	
		let news = await db.query(_sql);
		return news;
    },

    async postNews(input) {
        let _sql = 'INSERT INTO news (id, farm_id, datetime, title, description, image_url) VALUES (?)';	
		let news = await db.query(_sql, [input]);
		return news;
    },

}

module.exports = news