// 服务期端的websocket
const websocket = require('ws');
const ws = new websocket.Server({port:8081},()=>{
    console.log('ws 服务器启动')
})

let clients = [];
ws.on('connection',(client)=>{
    clients.push(client)
    // client 为客户端对象 每开一个客户端 都会又一个对象
    console.log('客户端连接')

    // 接收客户端发送的数据
    client.on('message',(res)=>{
        // msg---为客户端发送的数据
        // console.log(msg,'客户端发送数据')
        // console.log(msg)
        // let res = JSON.parse(msg)
        let val=JSON.parse(res);
        // console.log(msg)
        if(val.type==='reward'){
            sendAll(val.msg)
        }else if(val.type==='echart1'){
            setInterval(()=>{
                let data = [
                    {value:parseInt(Math.random()*1000), name:'直接访问'},
                    {value:parseInt(Math.random()*1000), name:'邮件营销'},
                    {value:parseInt(Math.random()*1000), name:'联盟广告'},
                    {value:parseInt(Math.random()*1000), name:'视频广告'},
                    {value:parseInt(Math.random()*1000), name:'搜索引擎'}
                ];
                // 将数据发送到客户端
                sendAll(data)
            },1000)
        }else if(val.type==='echart2'){
            setInterval(()=>{
                let data = [
                    {value:parseInt(Math.random()*1000), name:'直接访问'},
                    {value:parseInt(Math.random()*1000), name:'邮件营销'},
                    {value:parseInt(Math.random()*1000), name:'联盟广告'},
                    {value:parseInt(Math.random()*1000), name:'视频广告'},
                    {value:parseInt(Math.random()*1000), name:'搜索引擎'}
                ]
                sendAll(data)
            },1000)
        }
    })

    // 服务器端发送数据
    // client.send('欢迎光临')

    // 服务器监听客户端的断开连接
    client.on('close',()=>{
        console.log('客户端主动断开连接')
    })

    // 服务器主动断开连接----》然后会走客户端的close方法
    // setTimeout(()=>{
    //     console.log('服务器端主动断开连接')
    //     client.close()
    // },1000)

    
})

// 广播
function sendAll(obj){
    for(let i = 0 ,length=clients.length;i<length;i++){
        const element = clients[i];
        element.send(JSON.stringify(obj))
    }
}