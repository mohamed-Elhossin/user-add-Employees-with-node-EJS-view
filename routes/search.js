const express = require('express')
const router = express.Router();
const { Employee } = require('../database/employeedb')
router.get('/' , async (req,res)=>{
let name =req.query.search ; 

const employee = await Employee.find({name : new RegExp  ('.*' + name + '.*' , 'i' ) });
console.log(employee);
if(!employee) return res.status(404).send('employees has not found');
res.render('pages/home' , {employee : employee });


})

module.exports = router;