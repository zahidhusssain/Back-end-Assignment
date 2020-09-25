const express = require('express')
const app = express()

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const authentication = require('./routes');

app.use('/',authentication);
 
app.listen(5000)