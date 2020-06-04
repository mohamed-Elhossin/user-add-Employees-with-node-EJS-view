//valdiation lib @hapi/joi
const joi = require('@hapi/joi');
// require laib mongoose
const mongoose = require('mongoose');

// conniction to data base 
mongoose.connect('mongodb://localhost/final-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('this message from database sheet connected done'))
  .catch(() => console.log('this message from database sheet connected fail'));


// build schema
const employeesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  phone: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // img: {
  //   data: Buffer,
  //   contentType: String,
  // },
  isAttend: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

// convert model in database as a class called employee
const Employee = mongoose.model('Employee', employeesSchema);

// validation data with @hapi/joi

function valdiate(employee) { 
  const schema = joi.object({
    name: joi.string().required().min(3).max(255),
    phone: joi.string().required().min(11),
    price: joi.number().required().min(100)

  });
  return schema.valdiate(employee)
};

exports.Employee = Employee;
exports.valdiate = valdiate;






















// method co create new model data
async function createmodel() {

  const employee = new Employee({
    name: 'Toma',
    phone: '01117433885',
    price: 5000,
  });
  try {
    const result = await employee.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);

  }

}

// method to get new data
async function getEmployees() {
  const employees = await Employee.find().limit().countDocuments();

  console.log(employees);
}
//getEmployees()
//createmodel();
/* 
  // method to edit data bi ID this is first way

async function updateEmployee(id){
const employee = await Employee.findById(id);

if(!employee) return;

employee.set({
  name : "#updated # toma elhossiny##",
  price : 6000
});

const result = await employee.save();
 console.log(result);
} */
// second wat to update data 

async function updateEmployee(id) {
  const emp = await Employee.findByIdAndUpdate({
    _id: id
  }, {
    $set: {
      name: 'ihab galal',
      price: 3000

    }
  });
  console.log(emp);
}

//updateEmployee('5e7814f8a70a983afc6c4c72');


// to delate data by ID
async function delateEmployee(id) {
  const r = await Employee.deleteOne({
    _id: id
  });
  console.log(r);

}
//delateEmployee('5e7c37aa71130c1348e14577');