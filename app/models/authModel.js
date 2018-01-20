const db = require('../utils/database')

const auth = {
    async updateUserToken(iat, id){
        let _sql =  'UPDATE users SET iat = ? WHERE id = ?';
        console.log(iat)
        result = await db.query(_sql, [iat, id]);
        return result;
    },
}

module.exports = auth