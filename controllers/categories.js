const categoriesRouter = require('express').Router();

const categoriesService = require('../services/categoryService');

categoriesRouter.get('/', async (request, response) => {
  const categories = await categoriesService.getAllCategories();
  response.json(categories);
});

module.exports = categoriesRouter;
