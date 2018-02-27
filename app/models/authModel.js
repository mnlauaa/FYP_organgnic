const db = require('../utils/database')

const auth = {
    async updateUserToken(iat, id){
        let _sql =  'UPDATE users SET iat = ? WHERE id = ?';
        result = await db.query(_sql, [iat, id]);
        return result;
    },
    
    async checkUserVariableExist(item, username){
        let _sql =  'SELECT ?? FROM users where username = ?';
        result = await db.query(_sql, item, username);
        return result;
    },

    async userSignUp(newUser){
        let _sql =  'INSERT INTO order_forms(username, password, display_name, phone_number, address, iat) VALUES(?)';
        result = await db.query(_sql, newUser);
        return result;
    }
}

module.exports = auth