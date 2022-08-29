const mongoose = require('mongoose');
require('dotenv').config();
const database = process.env.DB_URL
mongoose.connect(database);
const db = mongoose.connection;
db.on('error',console.error.bind(console, "Error connection to mongodb"));
db.once('open',function(){
    console.log('connected to database :: MongoDB');
});
module.exports = db;