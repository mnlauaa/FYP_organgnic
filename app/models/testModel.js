const db = require('../utils/database')

module.exports = {
    getTest
}


async function getTest(){
    let testing = await db.query('SELECT 1 + 1 AS solution');
    return testing;
}