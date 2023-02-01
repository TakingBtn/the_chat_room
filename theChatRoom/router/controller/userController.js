const JWT = require('../plugins/jwt')
const {registerUser, loginUser} = require('../service/userService')
// 用户登录处理器
exports.loginUserHandler = async function(req,res){
    console.log('loginUserHandler',req.body)
    const {username, password} = req.body
    let result = await loginUser(username,password)
    console.log("loginUserHandler_result",result)
    // 
    if(result.length == 0){
        res.send({ok:0})
    }else{
        // console.log(result[0])
        let payload = {
            _id: result[0]._id,
            username: result[0].username
        }
        const token = JWT.generate(payload,"1h")
        res.header('Authorization',token)
        res.send({message:'登录成功',code:1})
    }
}
// 用户注册处理器
exports.registerUserHandler = async function(req,res){
    // console.log("req.url",req.url)
    console.log('registerUserHandler',req.body)
    const {username,password} = req.body
    console.log('username',username,'password',password)
    // 注册新用户 把用户信息存储到数据库
    let result = await registerUser(username,password)
    console.log('registerUserHandler_result',result)
    res.send({message:'注册成功',code:1})
}