const db = require('../utils/database')

const auth = {
    async updateUserToken(iat, id){
        let _sql =  'UPDATE users SET iat = ? WHERE id = ?';
        result = await db.query(_sql, [iat, id]);
        return result;
    },
    
    async checkUsernameExist(username){
        let _sql =  'SELECT username FROM users WHERE username = ?';
        result = await db.query(_sql, username);
        return result;
    },

    async checkUserDisplayNameExist(dispaly_name){
        let _sql =  'SELECT display_name FROM users WHERE display_name = ?';
        result = await db.query(_sql, dispaly_name);
        return result;
    },

    async userSignUp(newUser){
        let _sql =  'INSERT INTO users (username, password, display_name, phone_number, address, identity, iat) VALUES (?)';
        result = await db.query(_sql, [newUser]);
        return result;
    }
}

module.exports = auth