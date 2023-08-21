const express = require('express');
const router = express.Router();
const Employees = require('../models/employees.model');

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employees.find().populate('department'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {

  try {
    const count = await Employees.countDocuments(); // count number of documents
    const rand = Math.floor(Math.random() * count); // random number but not higher than no. documents
    const dep = await Employees.findOne().skip(rand).populate('department');  // find document from different number 
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.get('/employees/:id', async (req, res) => {

  try {
    const dep = await Employees.findById(req.params.id).populate('department');
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.post('/employees', async (req, res) => {

  try {

    const { firstName, lastName, department } = req.body;
    const newDepartment = new Employees({ firstName: firstName, lastName: lastName, department: department });
    await newDepartment.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    const dep = await Employees.findById(req.params.id);
    if(dep) {
      await Employees.updateOne({ _id: req.params.id }, { $set: { firstName:firstName, lastName:lastName, department:department }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.delete('/employees/:id', async (req, res) => {
  try {
    const dep = await Employees.findById(req.params.id);
    if(dep) {
      await Employees.deleteOne({  _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

module.exports = router;
