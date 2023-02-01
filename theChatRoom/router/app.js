const webSocket = require('ws')
const express = require('express')
const app = express()

// 配置文件
require("./config/db.config")// 引入数据库模块

// 导入插件（全局事件）
const JWT = require('./plugins/jwt')

// 导入路由
const userRouter = require('./routes/userRouter')


// 全局事件
// 用node process的全局unhandledRejection事件来处理 err
process.on('unhandledRejection', error => {
    console.log('我帮你处理了', error);
});
// 处理前端来的 json数据
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// node中间件校验
// token验证
/*
    第一种情况
    进入登录页面，直接放行
    第二种情况

*/
app.use((req,res,next)=>{
    console.log("检验token req.url",req.url)
    if(req.url === '/user/login' || req.url === '/user/register'){
        // console.log('one')
        next()
        return; //??
    }
    // console.log('two')
    // 判断？
    const token = req.headers["authorization"]?.split(" ")[1]
    if(token){
        let payload = JWT.verify(token)
        console.log("payload",payload)
        // 生成token
        if(payload){
            const newToken = JWT.generate({
                _id: payload._id,
                username: payload.username
            },"1h")
            res.header("Authorization",newToken)
            next()
        }else{
            res.status(401).send({errCode:"-1",errorInfo:"token过期"})
        }
    }
})

// 路由器级中间件
app.use('/user',userRouter)

// http服务
let server = app.listen(8081, ()=>{
    let host = server.address().address
    let port = server.address().port
    console.log("服务已经启动于 http://",host,port)
})


// websocket服务
webSocketServer = webSocket.WebSocketServer
// console.log(webSocketServer)
// console.log(webSocket)
const wss = new webSocketServer({port:8082})

wss.on('connection',(ws,req)=>{
    // console.log(req.url)
    const myURL = new URL(req.url,"http://localhost:8080")
    // console.log(myURL.searchParams.get("token"))

    const payload = JWT.verify(myURL.searchParams.get("token"))
    if(payload){
        ws.send("欢迎加入聊天室")
    }else{
        ws.send("你还没有登录o")
    }
    ws.on('message',(data, isBinary)=>{
        wss.clients.forEach(client => {
            if(client != ws && client.readyState === webSocket.OPEN){
                // console.log(client)
                console.log("ws发送信息",data)
                client.send(data, {binary:isBinary})
            }
        });
    })
    ws.on('close',()=>{
        console.log('有人静悄悄地离开了聊天室')
    })
    
})
