const productsRouter = require('express').Router();
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const productsService = require('../services/productsService')

productsRouter.get('/', async (request, response) => {
  const products = await Product
    .find({})
    .populate('category', {name: 1});

  response.json(products);
});

productsRouter.get('/:id', async (request, response) => {
  const product = await Product.findById(request.params.id);
  if(product){
    response.send(product);
  }else{
    response.status(404).end();
  }
})

productsRouter.post('/', async (request, response) => {
  const savedProduct = await productsService.createProduct(request.body);
  response.json(savedProduct);
});

module.exports = productsRouter;
