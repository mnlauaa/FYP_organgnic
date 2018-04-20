const db = require('../utils/database')

const chat = {
    async findMyChat(id){
        let _sql = `SELECT c.*, sender.display_name AS sender_name, receiver.display_name AS receiver_name,
                           sender.profile_pic_url AS sender_image, receiver.profile_pic_url AS receiver_image
                    FROM chat_logs c  
                    INNER JOIN users receiver ON c.receiver_id = receiver.id
                    INNER JOIN users sender ON c.sender_id = sender.id
                    WHERE c.id IN 
                    (SELECT MAX(c.id) 
                        FROM chat_logs c 
                        WHERE c.sender_id  = ? OR  c.receiver_id = ? 
                        GROUP BY (IF(c.receiver_id = ?, c.sender_id, c.receiver_id)))
                    ORDER BY c.datetime DESC`
        let result = await db.query(_sql, [id, id, id])
        return result;
    },

    async countUnReadById(receive, sender){
        let _sql = `SELECT COUNT(*) AS unRead 
                    FROM chat_logs 
                    WHERE sender_id  = ? AND  receiver_id = ? AND _read = 0`
        let result = await db.query(_sql, [receive, sender])
        return result;
    },

    async countAllUnRead(user_id){
        let _sql = `SELECT COUNT(*) AS unRead 
                    FROM chat_logs 
                    WHERE receiver_id = ? AND _read = 0`
        let result = await db.query(_sql, [user_id, user_id])
        return result;
    },

    async findChatById(user_id, other_id){
        let _sql = `SELECT c.*, sender.display_name AS sender_name, receiver.display_name AS receiver_name,
                           sender.profile_pic_url AS sender_image, receiver.profile_pic_url AS receiver_image
                    FROM chat_logs c  
                    INNER JOIN users receiver ON c.receiver_id = receiver.id
                    INNER JOIN users sender ON c.sender_id = sender.id
                    WHERE (c.sender_id  = ? AND  c.receiver_id = ?) OR (c.sender_id  = ? AND  c.receiver_id = ?)
                    ORDER BY c.datetime ASC`
        let result = await db.query(_sql, [user_id, other_id, other_id, user_id])
        return result;
    },

    async findChatByChatId(id){
        let _sql = `SELECT c.*, sender.display_name AS sender_name, receiver.display_name AS receiver_name,
                           sender.profile_pic_url AS sender_image, receiver.profile_pic_url AS receiver_image
                    FROM chat_logs c  
                    INNER JOIN users receiver ON c.receiver_id = receiver.id
                    INNER JOIN users sender ON c.sender_id = sender.id
                    WHERE c.id = ?`
        let result = await db.query(_sql, id)
        return result;
    },

    async addChat(input){
        let _sql = 'INSERT INTO chat_logs (sender_id, receiver_id, datetime, message, _read) VALUES (?)'
        let result = await db.query(_sql, [input])
        return result;
    },

    async readChat(user_id, other_id){
        let _sql = `UPDATE chat_logs c
                    SET _read = 1
                    WHERE (c.sender_id  = ? AND  c.receiver_id = ?)`
        let result = await db.query(_sql, [other_id, user_id])
        return result;
    }
}

module.exports = chat