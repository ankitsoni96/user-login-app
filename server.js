const express = require('express')
const app = express()
const config = require('./api/utils/config')
const DB = require('./api/utils/db')
const v1Routes = require('./routes/v1Routes')

var listenAt = 'http'

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/v1',v1Routes)

DB.connect().then(()=>{
    app.listen(config.port,()=>{
        console.log(`Listening on ${listenAt}://${config.host}:${config.port}`);
    });
})
