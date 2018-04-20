const newSocket = require('socket.io')
const chatModel = require('../models/chatModel');
var io = null;
var users = {};

function init(server){
    io = newSocket(server);
    buildEvents()
}

function buildEvents(){
    io.on('connection', (socket) => {
        socket.on('read', async(user, other)=>{
            console.log("hello")
            await chatModel.readChat(user, other);
        })

        socket.on('private message', async (data, fn)=>{
            if(data.to in users){
                let input = [Number(data.from), Number(data.to), new Date(), data.msg, 1]
                let insert = await chatModel.addChat(input);
                let message = await chatModel.findChatByChatId(insert.insertId);
                users[data.to].emit(data.from+'-to-'+ data.to, message[0]);
                fn(message[0])
            } else {
                let input = [Number(data.from), Number(data.to), new Date(), data.msg, 0]
                let insert = await chatModel.addChat(input);
                let message = await chatModel.findChatByChatId(insert.insertId);
                fn(message[0])
            }
        });
    
        socket.on('new-user', (id) => {
            console.log(id + " enter")
            if(id in users){  
          
            }else{  
               var _id = id;  
               users[_id]= socket;  
            }  
        });
    
        socket.on('leave', (id)=>{
            console.log(id + " leave")
            delete users[id]
            io.sockets.emit('user'+id+'disconnected');  
            
        });
    });
}

module.exports = {
    init
}
