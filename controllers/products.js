const productsRouter = require('express').Router();

const productsService = require('../services/productsService');

productsRouter.get('/', async (request, response) => {
  const products = await productsService.getAllProducts();
  response.json(products);
});

productsRouter.get('/category/:cat', async (request, response) => {
  const productsByCategory = await productsService.getProductsByCategoryName(request.params.cat);
  response.json(productsByCategory);
});

productsRouter.get('/:id', async (request, response) => {
  const product = await productsService.getProductById(request.params.id);
  if(product){
    response.send(product);
  }else{
    response.status(404).end();
  }
});

productsRouter.post('/', async (request, response) => {
  const savedProduct = await productsService.createProduct(request.body);
  response.json(savedProduct);
});

productsRouter.put('/:id', async (request, response) => {
  const updatedProduct = await productsService.updateProduct(request.body, request.params.id);
  response.json(updatedProduct);
});

productsRouter.delete('/:id', async (request, response) => {
  await productsService.deleteProduct(request.params.id);
  return response.status(204).end();
});

module.exports = productsRouter;
