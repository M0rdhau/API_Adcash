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

module.exports = categoriesRouter;
