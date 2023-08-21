const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/products.controller');

router.get('/products', ProductsController.getAll);

router.get('/products/random', ProductsController.getRandom);

router.get('/products/:id', ProductsController.getProduct);

router.post('/products', ProductsController.addProduct);

router.put('/products/:id', ProductsController.updateProduct);

router.delete('/products/:id', ProductsController.deleteProduct);

module.exports = router;
