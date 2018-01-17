const db = require('../utils/database')

const test = {
    async getTest(){
        let testing = await db.query('SELECT 1 + 1 AS solution');
        return testing;
    }
}

module.exports = test;