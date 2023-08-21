const express = require('express');
const router = express.Router();
const EmployeesController = require('../controllers/employees.controller');


router.get('/employees', EmployeesController.getAll);

router.get('/employees/random', EmployeesController.getRandom);

router.get('/employees/:id', EmployeesController.getEmployee);

router.post('/employees', EmployeesController.addEmployee);

router.put('/employees/:id', EmployeesController.updateEmployee);

router.delete('/employees/:id', EmployeesController.deleteEmployee);

module.exports = router;
