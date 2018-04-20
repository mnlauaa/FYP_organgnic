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
                WHERE n.active = 1 AND (n.title LIKE ? OR u.display_name LIKE ?)
                ORDER BY datetime DESC`;
		let news = await db.query(_sql, [keyword, keyword]);
    return news;
    },

    async findAllNewsByfarm(id) {
      let _sql = `SELECT *
                  FROM news
                  WHERE active = 1 AND farm_id = ?
                  ORDER BY datetime DESC`;
      let news = await db.query(_sql, id);
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

    async postNews(news_parms, news_imgae_url) {
        let _sql = `INSERT INTO news (farm_id, title, description, datetime`;
        if(news_imgae_url){
          _sql += `, image_url`;
          news_parms.push(news_imgae_url);
        }	
        _sql += `) VALUES (?)`;
		let news = await db.query(_sql, [news_parms]);
		return news;
    },

    async putNews(news_parms, news_imgae_url, news_id, farm_id) {
      let _sql = `UPDATE news SET title = ?, description = ?, datetime = ?`;	
      if(news_imgae_url){
        _sql += `, image_url = ? `;
        news_parms.push(news_imgae_url);
      }
      _sql += ` WHERE id = ? AND farm_id = ?`;
      news_parms.push(news_id);
      news_parms.push(farm_id);
      let news = await db.query(_sql, news_parms);
      return news;
    },

    async delNews(news_id){
      let _sql = `UPDATE news 
                  SET active = 0 
                  WHERE id = ?`;
      let del = await db.query(_sql, [news_id]);
      return del;
    }

}

module.exports = news