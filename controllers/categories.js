const categoriesRouter = require('express').Router();

const categoriesService = require('../services/categoryService');

categoriesRouter.get('/', async (request, response) => {
  const categories = await categoriesService.getAllCategories();
  response.json(categories);
});

categoriesRouter.post('/', async (request, response) => {
  const category  = await categoriesService.createNewCategory(request.body.name);
  response.json(category);
});

categoriesRouter.put('/:id', async (request, response) => {
  const updatedProduct = await categoriesService.updateCategory(request.body, request.params.id);
  response.json(updatedProduct);
});

categoriesRouter.delete('/:id', async (request, response) => {
  await categoriesService.deleteCategory(request.params.id);
  return response.status(204).end();
});

module.exports = categoriesRouter;
