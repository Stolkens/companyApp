const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Department.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {

  try {
    const count = await Department.countDocuments(); // count number of documents
    const rand = Math.floor(Math.random() * count); // random number but not higher than no. documents
    const dep = await Department.findOne().skip(rand);  // find document from different number 
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getDepartment = async (req, res) => {

  try {
    const dep = await Department.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.addDepartment = async (req, res) => {

  try {

    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.updateDepartment = async (req, res) => {
  const { name } = req.body;

  try {
    const dep = await Department.findByIdAndUpdate(req.params.id);
    if(dep) {
      await Department.updateOne({ _id: req.params.id }, { $set: { name: name }});
      res.json({ message: 'OK', updatedDepartment: dep });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.deleteDepartment = async (req, res) => {
  try {
    const dep = await Department.findByIdAndDelete(req.params.id);
    if(dep) {
      await Department.deleteOne({  _id: req.params.id });
      res.json({ message: 'OK', deletedDepartment: dep });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};
