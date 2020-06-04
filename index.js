//requires libariars
const express = require('express')
const joi = require('@hapi/joi');
const app = express();
const db = require('./database/employeedb')
const bodyParser = require('body-parser');
const employee = require('./routes/employees');
const search = require('./routes/search')
// const fakeData = require('./routes/faker');

// ejs required
app.set('view engine', 'ejs');
app.use('/css/', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/js/', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
app.use('/public', express.static(__dirname + '/public'));


//F:\Courses\IT-SHARE\MEAN stack\express\project\
// useing midelwears pipeline 
app.use(express.json()); // read data form user and transfit data to json objects
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())
app.use('/api/emp' ,employee );
app.use('/api/search' , search)
// app.use('/api/fake' ,fakeData );

// defulte port number if not port == 300
const port = process.env.port || 3000;
app.listen(port, () => console.log(`you are lesten to port number ${port}`));


// http://localhost:3000/emp