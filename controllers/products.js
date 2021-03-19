const productsRouter = require('express').Router();
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

productsRouter.get('/', async (request, response) => {
  const products = await Product
    .find({})
    .populate('category');

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
  const body = request.body;

  const product = new Product({
    name: body.name,
    category: body.category
  });

  const savedProduct = await product.save();
  response.json(savedProduct);
})
