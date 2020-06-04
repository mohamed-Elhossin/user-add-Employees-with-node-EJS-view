// const express = require('express')
// const router = express.Router();
// const faker = require('faker');
// const { Employee } = require('../database/employeedb')


// router.get('/',  (req, res) => {
//     for (let index = 0; index < 100; index++) {
//         let employees =  new Employee();
//         employees.name = faker.name.findName();
//         employees.phone = faker.phone.phoneNumber();
//         employees.price = faker.commerce.price();
//         employees.isattaned = faker.random.boolean();

//         employees.save((err) => {
//             if (err) throw err;
//         })
//     }
//     res.redirect('/api/emp');
// });

// module.exports= router;