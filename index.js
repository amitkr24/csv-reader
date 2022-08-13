const express       = require('express')
const app           = express()
const port          = 8002
const router        = require('./router/index');
var path            = require('path');
const bodyParser    = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
//set ejs template
app.set('view engine', 'ejs');

// define static path
app.use(express.static('upload'));
app.use('/',router)

//app.use('/issue',require('./router/issue'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})