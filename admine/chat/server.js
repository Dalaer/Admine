const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)

app.use(express.static(__dirname));

let record=[];
io.on('connection',(client)=>{
    // 拿到用户自己的名字
    client.on('getName',(msg)=>{
        // 将名字挂到对象上
        client.name=msg;
        // 当某用户连接上聊天时 和他打个招呼啊
        sendToSingle(client,{
            event:'greet_from_server',
            data:`您好吖~${msg}`
        })
        // 对其他用户添加通知：xxxx加入了聊天室
        broadcastExpectSelf(client,{
            event:'new_user_join',
            data:{
                user:client.id,
                name:client.name
            }
        })
    })
    // 监听用户发的聊天内容
    client.on('chatContent',(msg)=>{
        // 广播给其他用户 xxx说了yyyy
        broadcastExpectSelf(client,{
            event:'new_chat_content',
            data:{
                user:client.id,
                content:msg,
                name:client.name
            }
        })
    })
    // 拿到聊天记录
    client.on('sendRecord',(msg)=>{
        record.push(msg);
    })
    // 给客户端聊天记录
    client.on('chat',()=>{
        client.emit('chatRecord',record)
    })
    // 客户端断开
    client.on('disconnect',()=>{
        // 将当前用户离开的消息也存放到数组中 及聊天记录中
        record.push({
            name:client.name,
            val:'离开了聊天室',
            time:new Date().toLocaleString()
        })
        broadcastExpectSelf(client,{
            event:'someone_exit',
            data:{
                user:client.id,
                name:client.name
            }
        })
    })
})

server.listen(3006,()=>{
    console.log('服务器连接到了客户端')
})

// 给当前用户发送消息
function sendToSingle(client,params){
    client.emit('singleMsg',params)
}

// 给出了当前用户的其他用户发送消息
function broadcastExpectSelf(client,params){
    client.broadcast.emit('broadcast',params)
}
