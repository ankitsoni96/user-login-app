const jwt = require('jsonwebtoken')
const promise = require('bluebird')
const config = require('./config')
const db = require('./db')

class HeaderValidator {

  validateLanguage(req, res, next) {
    if (req.headers.language == undefined || req.headers.language == '') {
      res.send({code:0,status:200,message:"Language is required!"})
      return;
    }
    next()
  }

 

  nonAuthValidation(req, res, next) {
    if (!req.headers.default_auth_token) {
      res.send({code:0,status:200,message:"Default token is required!"})
    }
    else if (req.headers.default_auth_token !== config.default_auth_token) {
      res.send({code:0,status:200,message:"Invalid default auth token!"})
    } else {
      next()
    }
  }

  async authValidation(req, res, next) {
    if (!req.headers.auth_token) {
      res.send({code:0,status:200,message:"Token is required!"})
      return;
    }
    let token = req.headers.auth_token;
    jwt.verify(token, config.JWTSecretKey, async (err, decoded) => {
      console.log("decoded expire ::: ", decoded);
      if (err) {
        console.log(err);
        db.delete('login-users',{auth_token:token})
        res.send({code:0,status:401,message:"Token is expired or invalid!"})
        return;
      }
    })
    next()
  }

  async authoriseUser(req,res,next){
      let where = {
        auth_token:req.headers.auth_token
      }
      let result = await db.find('login-users',where)
      if(result.length > 0){
      }else{ 
        res.send({code:0,status:403,message:"Session has been expired, please login again."})
      return;
      }
  next()
  }
}

const HV = new HeaderValidator()
module.exports = HV
