const categoriesRouter = require('express').Router();

const categoriesService = require('../services/categoryService');

/***
 * @swagger
 * /api/categories/:
 *
 *  get:
 *    tags:
 *    - Categories
 *    description: Returns all categories
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          'application/json': {}
 */
categoriesRouter.get('/', async (request, response) => {
  const categories = await categoriesService.getAllCategories();
  response.json(categories);
});

/***
 * @swagger
 * /api/categories/:
 *
 *  post:
 *    tags:
 *    - Categories
 *    description: Creates a new category, based on name
 *    parameters:
 *      - name: body
 *        in: body
 *        description: Category object that needs to be added to the Database
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Category'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          'application/json': {}
 *      400:
 *        description: Bad Request
 *        content:
 *          'application/json': {}
 */
categoriesRouter.post('/', async (request, response) => {
  const category  = await categoriesService.createNewCategory(request.body.name);
  response.json(category);
});

/***
 * @swagger
 * /api/categories/{categoryId}:
 *
 *  put:
 *    tags:
 *    - Categories
 *    description: Updates name and of the category
 *    parameters:
 *      - name: body
 *        in: body
 *        description: Category object that needs to be updated in the Database
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Category'
 *      - name: categoryId
 *        in: path
 *        description: ID of a category
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          'application/json': {}
 *      400:
 *        description: Bad Request
 *        content:
 *          'application/json': {}
 */
categoriesRouter.put('/:id', async (request, response) => {
  const updatedProduct = await categoriesService.updateCategory(request.body, request.params.id);
  response.json(updatedProduct);
});

/***
 * @swagger
 * /api/categories/{categoryId}:
 *
 *  delete:
 *    tags:
 *    - Categories
 *    description: Deletes a category and all of belonging products by category id
 *    parameters:
 *      - name: categoryId
 *        in: path
 *        description: ID of a category
 *        required: true
 *    responses:
 *      204:
 *        description: Success
 *        content:
 *          'application/json': {}
 *      400:
 *        description: Bad Request
 *        content:
 *          'application/json': {}
 */
categoriesRouter.delete('/:id', async (request, response) => {
  await categoriesService.deleteCategory(request.params.id);
  return response.status(204).end();
});

module.exports = categoriesRouter;
