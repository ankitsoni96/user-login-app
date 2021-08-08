const userHelper = require('../helpers/userHelper');
const userValidator = require('../validators/userValidator');
const passwordHasher = require('aspnet-identity-pw');
const codeHelper = require('../../utils/codeHelper');
class userController {
    async register(req,res){
        try {
            await userValidator.validateRegister(req.body);
            let contact = await userHelper.isUserExist(req.body);
            let email = await userHelper.isUserExistWithEmail(req.body);
            if(contact.length > 0){
                throw 'User with same contact number is exist.'
            }
            if(email.length > 0){
                throw 'User with same email id is exist.'
            }
            await userHelper.register(req.body);
            res.send({code:1,status:200,message:"User signup successfully."})
        } catch (error) {
            res.send({code:0,status:200,message:error})
        }
    }

    async login(req,res){
        try {
            var token;
            var refresh_token;
            await userValidator.validateLogin(req.body);
            let userData = await userHelper.login(req.body);
            var isValid = passwordHasher.validatePassword(req.body.password, userData[0] && userData[0].password);
            if (isValid) {
                 token = codeHelper.getJwtToken(userData[0]._id);
                refresh_token = codeHelper.getJwtRefreshToken({ id: userData[0]._id, email: userData[0].email });
            } else {
                throw 'INCORRECT_PASSWORD'
            }

            await userHelper.addUserAsLogin(userData[0]._id,token)

            let data = [{
                auth_token:token,
                refresh_token:refresh_token
            }]

            res.send({code:1,status:200,message:"Login successfully",data:data})   
        } catch (error) {
            console.log(error)
            res.send({code:0,status:200,message:error})   
        }
    }

    async search(req,res){
        try {
            await userValidator.validateSearch(req.body)
            let result = await userHelper.search(req.body)
            res.send({code:1,status:200,message:"Sucess",data:result})  
        } catch (error) {
            console.log(error);
            res.send({code:0,status:200,message:error}) 
        }
    }

    async refreshToken(req, res) {
        try {
            let token;
            let refresh_token;
            await userValidator.validateRefreshToken(req.body)
            let checkAuthTokenValidity = await codeHelper.decodeAuthToken(req.body.auth_token);
            let decodeData = await codeHelper.decodeRefreshToken(req.body.refresh_token)
            let user_id = decodeData.data.id
            if (checkAuthTokenValidity === false) {
                token = codeHelper.getJwtToken(user_id);
                refresh_token = codeHelper.getJwtRefreshToken({ id: user_id })
                await userHelper.addUserAsLogin(user_id,token)
            } else {
                token = req.body.auth_token
                refresh_token = req.body.refresh_token
            }
            let data = {
                auth_token: token,
                refresh_token: refresh_token
            }
            res.send({code:1,status:200,message:"success",data:data})
        } catch (error) {
            console.log(error)
            res.send({code:0,status:200,message:error})
        }
    }

    async logout(req,res){
        try {
            let header = {
                auth_token:req.headers.auth_token
            }
            await userValidator.validateLogout(header)
            await userHelper.logout(req.headers.auth_token)
            res.send({code:1,status:200,message:"Logout successfully"})
        } catch (error) {
            console.log(error)
            res.send({code:0,status:200,message:error})
        }
    }
}

module.exports = new userController()