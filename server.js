const express = require('express')
const app = express()
const config = require('./api/utils/config')
const DB = require('./api/utils/db')
const v1Routes = require('./routes/v1Routes')

var listenAt = 'http'

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1',v1Routes)

DB.connect().then(()=>{
    app.listen(config.port,()=>{
        console.log(`Listening on ${listenAt}://${config.host}:${config.port}`);
    });
})
