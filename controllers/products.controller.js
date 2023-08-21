const Products = require('../models/products.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Products.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {

  try {
    const count = await Products.countDocuments(); // count number of documents
    const rand = Math.floor(Math.random() * count); // random number but not higher than no. documents
    const dep = await Products.findOne().skip(rand);  // find document from different number 
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getProduct = async (req, res) => {

  try {
    const dep = await Products.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.addProduct = async (req, res) => {

  try {

    const { name, client } = req.body;
    const newDepartment = new Products({ name: name, client: client });
    await newDepartment.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.updateProduct = async (req, res) => {
  const { name, client } = req.body;

  try {
    const dep = await Products.findById(req.params.id);
    if(dep) {
      await Products.updateOne({ _id: req.params.id }, { $set: { name: name, client: client }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.deleteProduct = async (req, res) => {
  try {
    const dep = await Products.findById(req.params.id);
    if(dep) {
      await Products.deleteOne({  _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};