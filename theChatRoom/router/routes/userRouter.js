const router = require('express').Router()

// 导入控制器
const {registerUserHandler, loginUserHandler} = require('../controller/userController')

// 导入路由中间件
// ...

router.get("/",(req,res)=>{
    res.send("/user")
})

// 登录
router.post("/login",loginUserHandler)
// 注册
router.post("/register",registerUserHandler)

module.exports = router