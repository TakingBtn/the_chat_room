const jsonwebtoken = require("jsonwebtoken")

const secret = "abcd"

const JWT = {
    generate(value, exprires){
        console.log(value)
        console.log(exprires)
        return jsonwebtoken.sign(value,secret,{expiresIn:exprires})
    },
    verify(token){
        try{
            return jsonwebtoken.verify(token,secret)
        }catch(e){
            return false
        }
    }
}

module.exports = JWT