const db = require('../../utils/db')
const passwordHasher = require('aspnet-identity-pw');
const { ObjectId } = require('mongodb');

class userHelper {
    async isUserExist(body){
        let where = {
            contact:body.contact,
        }
        let data = await db.find('users',where);
        return data
    }

    async isUserExistWithEmail(body){
        try {
            let where = {
                email:body.email,
            }
            let data = await db.find('users',where);
            return data
        } catch (error) {
            console.log(error);
        }
    }

    async register(body){
        try {
            let pass = passwordHasher.hashPassword(body.password);
            body.password = pass;
            return db.insertOne('users',body);
        } catch (error) {
            console.log(error);
        }
    }

    async login(body){
        try {
            let where = {
                email:body.email
            }
            return db.find('users',where)
        } catch (error) {
            console.log(error);
        }
    }

    async addUserAsLogin(id,auth_token){
        try {
            let data = {
                user_id:ObjectId(id),
                auth_token:auth_token
            }
            return db.insertOne('login-users',data)
        } catch (error) {
            console.log(error);
        }
    }

    async search(body){
        try {
            let where = {}
            let project = {}
            where['$or'] = [
                { name: { $regex: `${body.searchStr}.*`, $options: 'i' } },
                { contact: { $regex: `${body.searchStr}.*`, $options: 'i' } }
            ]
            project = {
                name:1,
                email:1,
                contact:1,
                country:1
            }
            let aggregate = [
               {
                $match:where
               },
               {
                $project: project
               },    
            ]

            return db.findWithAggregate('users',aggregate)
        } catch (error) {
            console.log(error)
        }
    }

    async logout(auth_token){
        let where ={
            auth_token:auth_token
        }
        return db.delete('login-users',where)
    }

    async updateTokenInLoginUser(oldToken,newToken){
        let where ={
            auth_token:oldToken
        }
        let data = {
            auth_token:newToken
        }
        return db.update('login-users',where,data)
    }
}

module.exports = new userHelper()