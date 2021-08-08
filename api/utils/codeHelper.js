const promise = require('bluebird')
const jwt = require('jsonwebtoken')
const config = require('./config')

class CodeHelper {
    getJwtToken(user_id) {
        try {
            let expirationTime = '1m',
                sign = {
                    user_id: user_id
                }
            let token = jwt.sign(sign, config.JWTSecretKey, {
                expiresIn: expirationTime
            });
            return token
        } catch (error) {
            return promise.reject(error)
        }
    }

    getJwtRefreshToken(data) {
        try {
            let expirationTime = '2 days',
                sign = {
                    data: data
                }
            let token = jwt.sign(sign, config.JWTSecretKey, {
                expiresIn: expirationTime
            });
            return token
        } catch (error) {
            return promise.reject(error)
        }
    }

    decodeRefreshToken(token) {
        try {
            return new promise((resolve, reject) => {
                jwt.verify(token, config.JWTSecretKey, async (error, decoded) => {
                    if (error) {
                        console.log(error)
                        reject('REFRESH_TOKEN_EXPIRED')
                    } else {
                        resolve(decoded)
                    }
                })
            })
        } catch (error) {
            return promise.reject(error)
        }
    }

    decodeAuthToken(token) {
        try {
            return new promise((resolve, reject) => {
                jwt.verify(token, config.JWTSecretKey, async (error, decoded) => {
                    if (error) {
                        console.log(error)
                        resolve(false)
                    } else {
                        resolve(true)
                    }
                })
            })
        } catch (error) {
            return promise.reject(error)
        }
    }

   
    refreshToken(old_token, refresh_token, for_admin) {
        try {
            console.log("old_token ::: ", old_token);
            let token, decoded = jwt.decode(old_token)
            console.log("decoded ::: ", decoded);
            if (refresh_token == config.refresh_token && decoded && decoded.user_id) {
                token = this.getJwtToken(decoded.user_id, decoded.user_type, for_admin)
            } else {
                throw 'TOKEN_MALFORMED'
            }
            return token
        } catch (error) {
            return promise.reject(error)
        }
    }
    decodeToken(token) {
        try {
            return new promise((resolve, reject) => {
                jwt.verify(token, config.JWTSecretKey, async (error, decoded) => {
                    if (error) {
                        console.log(error)
                        reject('TOKEN_EXPIRED')
                    } else {
                        resolve(decoded)
                    }
                })
            })
        } catch (error) {
            return promise.reject(error)
        }
    }
    
}
const CH = new CodeHelper()
module.exports = CH
