const chatModel = require('../models/chatModel');

module.exports = {
    getMyChat,
    getMyUnRead,
    getChatById,
    postChat
}

async function getMyChat(ctx) {
    let id = ctx.state.user.id;
    let chats = await chatModel.findMyChat(id)
    for(var i = 0; i < chats.length; i++){
        let sender, receive
        if(chats[i].sender_id == id){
            receive = chats[i].sender_id;
            sender = chats[i].receiver_id;
        } else {
            receive = chats[i].receiver_id;
            sender = chats[i].sender_id;
        }
        let un_read = await chatModel.countUnReadById(receive, sender)
        chats[i].un_read = un_read[0].unRead
    }
    ctx.body = chats
}

async function getMyUnRead(ctx){
    let id = ctx.state.user.id;
    let result = await chatModel.countAllUnRead(id)
    ctx.body = result
}

async function getChatById(ctx) {
    let id = ctx.state.user.id;
    let other_id = ctx.params.id;
    let chats = await chatModel.findChatById(id, other_id)
    ctx.body = chats;
}

async function postChat(ctx) {
    
}