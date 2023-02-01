const router = require('express').Router()

console.log(router)

router.get("/",(req,res)=>{
    res.send("/index")
})