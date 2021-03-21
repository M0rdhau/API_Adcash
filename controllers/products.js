const productsRouter = require('express').Router();

const productsService = require('../services/productsService');

/***
 * @swagger
 * /api/products/:
 *
 *  get:
 *    tags:
 *    - Products
 *    description: Returns all products
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          'application/json': {}
 */
productsRouter.get('/', async (request, response) => {
  const products = await productsService.getAllProducts();
  response.json(products);
});


/***
 * @swagger
 * /api/products/category/{categoryName}:
 *
 *  get:
 *    tags:
 *    - Products
 *    description: Returns products based on category
 *    parameters:
 *    - name: categoryName
 *      in: path
 *      description: name of category
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          'application/json': {}
 *      404:
 *        description: Category not found
 */
productsRouter.get('/category/:cat', async (request, response) => {
  const productsByCategory = await productsService.getProductsByCategoryName(request.params.cat);
  response.json(productsByCategory);
});


/***
 * @swagger
 * /api/products/{productId}:
 *
 *  get:
 *    tags:
 *    - Products
 *    description: Returns a product by ID
 *    parameters:
 *    - name: productId
 *      in: path
 *      description: ID of a product
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          'application/json': {}
 *      400:
 *        description: product ID does not exist
 */
productsRouter.get('/:id', async (request, response) => {
  const product = await productsService.getProductById(request.params.id);
  response.send(product);
});

/***
 * @swagger
 * /api/products/:
 *
 *  post:
 *    tags:
 *    - Products
 *    description: Creates a new product, based on product name and category
 *    parameters:
 *      - name: body
 *        in: body
 *        description: Product object that needs to be added to the Database
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Product'
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
productsRouter.post('/', async (request, response) => {
  const savedProduct = await productsService.createProduct(request.body);
  response.json(savedProduct);
});

/***
 * @swagger
 * /api/products/{productId}:
 *
 *  put:
 *    tags:
 *    - Products
 *    description: Updates name and/or category of the product
 *    parameters:
 *      - name: body
 *        in: body
 *        description: Product object that needs to be updated in the Database
 *        required: true
 *        schema:
 *          $ref: '#/definitions/PutProduct'
 *      - name: productId
 *        in: path
 *        description: ID of a product
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
productsRouter.put('/:id', async (request, response) => {
  const updatedProduct = await productsService.updateProduct(request.body, request.params.id);
  response.json(updatedProduct);
});

/***
 * @swagger
 * /api/products/{productId}:
 *
 *  delete:
 *    tags:
 *    - Products
 *    description: Deletes a product by id
 *    parameters:
 *      - name: productId
 *        in: path
 *        description: ID of a product
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
productsRouter.delete('/:id', async (request, response) => {
  await productsService.deleteProduct(request.params.id);
  return response.status(204).end();
});

module.exports = productsRouter;
