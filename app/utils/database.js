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

function getDataById (table,  id) {
  let _sql =  "SELECT * FROM ?? WHERE id = ? ";
  return query( _sql, [ table, id ] );
}

function selectAll (table) {
  let  _sql =  "SELECT * FROM ?? ";
  return query( _sql, [ table ] );
}


module.exports = {
    query,
    getDataById,
    selectAll
}