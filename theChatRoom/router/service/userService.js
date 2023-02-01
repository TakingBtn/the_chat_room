const mongoose = require('mongoose')

const Scheme = mongoose.Schema
const UserType = {
    username: String,
    password: String
}

const UserModel = mongoose.model("user", new Scheme(UserType))

exports.loginUser = (username, password)=>{
    console.log('loginUser',username, password)
    return UserModel.find({username,password})
}

exports.registerUser = function (username, password) {
    console.log('registerUser', username, password)
    // 执行存储进入数据库操作
    return UserModel.create({
        username,
        password
    })
}