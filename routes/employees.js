const express = require('express')
const joi = require('@hapi/joi');
const router = express.Router();
const { Employee, valdiate } = require('../database/employeedb')
var multer  = require('multer');

var upload = multer({ dest: 'uploads/' })

router.get('/', async (req, res) => {
    const employees = await Employee.find();
    res.render('pages/home', { employee: employees })
});

router.get('/add', async (req, res) => {
    const employees = await Employee.find();
    res.render('pages/add-emp')
});

router.get('/:id', async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        return res.status(404).send("Employee not exist at system ");
    }
    res.render('pages/emp-id', { employee: employee })
});

// post or create new element 
router.post('/', upload.single('PI') ,async (req, res) => {
 console.log(req.file);
    // const {error} =valdiate(req.body);
    //    if(error) return res.status(404).send(error.details[0].message);
    let employee = new Employee({
        name: req.body.name,
        price: req.body.price,
        phone: req.body.phone,
        isAttend: req.body.isAttend
    })
    employee = await employee.save();
    res.redirect('/api/emp');
});

// update new element by ID
router.put('/:id', async (req, res) => {
    // const {error} =valdiate(req.body);
    // if(error) return res.status(404).send(error.details[0].message);
    let employee = await Employee.findOneAndUpdate(req.params.id , {
        name: req.body.name,
        price: req.body.price,
        phone: req.body.phone,
        isAttend: req.body.isAttend
    });
    employee = await employee.put();
    res.redirect('/api/emp');
});

// dalate new element by ID
router.delete('/delete/:id', async (req, res) => {
    let emp = await Employee.findByIdAndRemove(req.params.id);
    if (!emp) {
        res.status(404).send('sorry this product not found')
    }
    res.send(emp);
});


module.exports = router;