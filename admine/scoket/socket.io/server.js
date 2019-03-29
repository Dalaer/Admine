const express = require('express');
const app = express();
app.use(express.static(__dirname+'/index.html'))
// 将server和http服务器联系起来
var server = require('http').Server(app);
// 创建一个socket对象
const io = require('socket.io')(server)

let clients=[]

io.on('connection',(client)=>{
    console.log('客户端连上啦！')
    clients.push(client)

    // 向客户端发送事件
    client.emit('hello',{dala:'world'})

    // 监听客户端发送的时间
    client.on('dala',(msg)=>{
        console.log(msg)
    })

    // 拿到客户端直接发送的数据
    client.on('message',(msg)=>{
        console.log(msg)
    })

    // 直接向客户端发送数据
    client.send('lala')

    // 监听需要发送所有的
    client.on('all',()=>{
        sendAll()
    })

    // 广播
    client.on('bobo',()=>{
        console.log('收到客户端发过来的请求 去发广播')
        client.broadcast.emit('bobo','broadcast--发广播')
    })

    // // 全部的
    // client.on('all',()=>{
    //     console.log('给所有的发广播')
    // })
    
    // // 向所有用户发送消息
    // client.on('bobo',(msg)=>{
    //     io.emit('bobo',msg)
    // })
    
    // client.emit('bobo','daal')
})
    
server.listen(3005,()=>{
    console.log('服务器启动了')
})
    
function send(client){
    client.broadcast.emit('message','lalal')
}

function sendAll(){
    for(let i = 0 ,length=clients.length;i<length;i++){
        const element = clients[i];
        element.emit('all','你好吖~')
    }
}