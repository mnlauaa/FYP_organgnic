const mysql = require('mysql');
const config = require('../../config');
const dbConfig = config.database;
const db = mysql.createConnection(dbConfig);

db.connect();

function query(sql, values){
    return new Promise((resolve, reject)=>{
        db.query(sql, values, (err, rows)=>{
            if(err){
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

module.exports = {
    db,
    query
}