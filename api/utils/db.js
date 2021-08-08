const config = require('./config');
const mongo = require('mongodb').MongoClient
const objectID = require('mongodb').ObjectID
const promise = require('bluebird');
let _db

class databaseHelper {
    getMongoObjectId(id) {
        return new objectID(id)
    }

    connect() {
        return new promise((resolve, reject) => {
            mongo.connect(config.db.url, { useNewUrlParser: true }).then((db) => {
                _db = db.db(config.db.database);
                console.log("DB connected");
                resolve(db);
            }).catch((error) => {
                reject({ code: 0, message: 'DB_ERROR' });
            })
        })
    }

    insertOne(table, data) {
        return new promise((resolve, reject) => {
            _db.collection(table).insertOne(data)
                .then((data) => {
                    resolve(data);
                }).catch((error) => {
                    console.log(error);
                    reject({ code: 0, message: 'DB_ERROR' });
                })
        })
    }

    find(table, where, projection) {
        console.log(`\n\nfind(${JSON.stringify(where)} , ${JSON.stringify(projection)})`);
        return new promise((resolve, reject) => {
            _db.collection(table).find(where, projection).toArray()
                .then((data) => {
                    resolve(data);
                }).catch((error) => {
                    reject({ code: 0, message: 'DB_ERROR' });
                })
        })
    }

    update(table, where, newData) {
        return new promise((resolve, reject) => {
            _db.collection(table).findOneAndUpdate(where,
                {
                    $set: newData
                })
                .then((data) => {
                    resolve(data);
                }).catch((error) => {
                    reject({ code: 0, message: 'DB_ERROR' });
                })
        })
    }
    
    delete(table, where) {
        return new promise((resolve, reject) => {
            _db.collection(table).deleteOne(where)
                .then((data) => {
                    resolve(data);
                }).catch((error) => {
                    reject({ code: 0, message: 'DB_ERROR' });
                })
        })
    }

    findWithAggregate(table, aggregatation) {
        return new promise((resolve, reject) => {
            _db.collection(table).aggregate(aggregatation).toArray()
                .then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    console.log("error", error)
                    reject({ code: 0, message: 'DB_ERROR' })
                })
        })
    }
}

module.exports = new databaseHelper();