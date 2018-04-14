const db = require('../utils/database')

const news = {
    async findNewsById(id) {
		let _sql = 'SELECT * FROM news WHERE id = ?';
		let news = await db.query(_sql, id);
		return news;
    },
    
    async findAllNews(keyword) {
		let _sql = `SELECT n.*, u.display_name
                FROM news n
                INNER JOIN farms f ON n.farm_id = f.id
                INNER JOIN users u ON f.seller_id = u.id
                WHERE n.active = 1 AND (n.title LIKE ? OR u.display_name LIKE ?)`;	
		let news = await db.query(_sql, [keyword, keyword]);
		return news;
    },

    async getSearchResult(keyword){
      let _sql = `SELECT COUNT(n.id) AS num
            FROM news n
            INNER JOIN farms f ON f.id = n.farm_id
            INNER JOIN users u ON f.seller_id = u.id
            WHERE n.active = 1 AND (n.title LIKE ? OR u.display_name LIKE ?)`;
      let num = await db.query(_sql, [keyword, keyword]);
      return num 
    },

    async postNews(input) {
        let _sql = 'INSERT INTO news (farm_id, datetime, title, description, image_url) VALUES (?)';	
		let news = await db.query(_sql, [input]);
		return news;
    },

    async putNews(input) {
        let _sql = `UPDATE news 
                    SET farm_id = 'Alfred Schmidt', title = '', description = '', image_url = ''
                    WHERE id = ?;`;	
		let news = await db.query(_sql, [input]);
		return news;
    },

}

module.exports = news