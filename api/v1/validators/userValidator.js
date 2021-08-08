const joi = require('joi')

class userValidator {
    async validateRegister(body){
        let schema = joi.object().keys({
            email:joi.string().required(),
            name:joi.string().required(),
            contact:joi.string().min(10).max(10).required(),
            gender:joi.string().valid('M','F').required(),
            address:joi.string().required(),
            country:joi.string().required(),
            password:joi.string().min(6).max(8).required()
        })
        let value = await schema.validate(body);
        if(value.error){
            throw value.error.details[0].message
        }else{
            return value;
        }
    }

    async validateLogin(body){
        let schema = joi.object().keys({
            email:joi.string().required(),
            password:joi.string().required(),
        })
        let value = await schema.validate(body);
        if(value.error){
            throw value.error.details[0].message
        }else{
            return value;
        }
    }

    async validateSearch(body){
        let schema = joi.object().keys({
            searchStr:joi.string().required(),
        })
        let value = await schema.validate(body);
        if(value.error){
            throw value.error.details[0].message
        }else{
            return value;
        }
    }

    async validateRefreshToken(body) {
        let schema = joi.object().keys({
            auth_token: joi.string().required(),
            refresh_token: joi.string().required(),
        })
        let value = await schema.validate(body);
        if(value.error){
            throw value.error.details[0].message
        }else{
            return value;
        }
    }

    async validateLogout(body){
        let schema = joi.object().keys({
            auth_token: joi.string().required(),
        })
        let value = await schema.validate(body);
        if(value.error){
            throw value.error.details[0].message
        }else{
            return value;
        }
    }
}

module.exports = new userValidator()