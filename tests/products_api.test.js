const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const helper = require('./test_helper');
const productService = require('../services/productsService');

beforeEach(async () => {
  await Product.deleteMany({});
  await Category.deleteMany({});
  for(let product of helper.initialProducts){
    await productService.createProduct(product);
  }
});

describe('getting values from database', () => {
  test('request returns correct amount of products', async () => {
    const response = await api.get('/api/products/');
    expect(response.body).toHaveLength(helper.initialProducts.length);
  });

  test('can return a single product', async () => {
    const productsAtStart = await helper.productsInDB();

    const productToCheck = productsAtStart[0];

    const resultProduct = await api
      .get(`/api/products/${productToCheck.id}`)
      .expect(200)
      .expect('Content-type', /application\/json/);

    // doing this because we convert mongoose models to JSON differently
    // see ../models/productModel.js
    const processedProduct = JSON.parse(JSON.stringify(productToCheck));
    expect(resultProduct.body).toEqual(processedProduct);
  });

  test('Can return products by category', async () => {
    const productsSubmitted = helper.initialProducts;
    const catOne = productsSubmitted[0].category;
    const catTwo = productsSubmitted[productsSubmitted.length - 1].category;

    const amtCatOne = productsSubmitted.filter(p => p.category === catOne).length;
    const amtCatTwo = productsSubmitted.filter(p => p.category === catTwo).length;

    const resCatOne = await api
      .get(`/api/products/category/${catOne}`)
      .expect(200)
      .expect('Content-type', /application\/json/);
    const resCatTwo = await api
      .get(`/api/products/category/${catTwo}`)
      .expect(200)
      .expect('Content-type', /application\/json/);
    expect(resCatOne.body).toHaveLength(amtCatOne);
    expect(resCatTwo.body).toHaveLength(amtCatTwo);
  });

  test('A product has an id defined', async () => {
    const productsAtStart = await helper.productsInDB();
    const productToCheck = productsAtStart[0];
    const resultProduct = await api
      .get(`/api/products/${productToCheck.id}`)
      .expect(200)
      .expect('Content-type', /application\/json/);
    expect(resultProduct.body.id).toBeDefined();
  });
});

describe('updating the database', () => {
  test('a product can be created', async () => {
    const newProduct = {
      name: 'Skoda',
      category: 'Cars'
    };
    await api
      .post('/api/products')
      .send(newProduct)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const productsFinally = await helper.productsInDB();
    expect(productsFinally).toHaveLength(helper.initialProducts.length + 1);

    const contents = productsFinally.map(p => p.name);
    expect(contents).toContain('Skoda');
  });
  test('a product can be updated', async () => {
    const productsAtStart = await helper.productsInDB();
    const productToUpdate = productsAtStart[0];
    const oldName = productToUpdate.name;
    productToUpdate.name = 'newName';

    await api
      .put(`/api/products/${productToUpdate.id}`)
      .send(productToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const productsFinally = await helper.productsInDB();
    expect(productsFinally).toHaveLength(helper.initialProducts.length);

    const contents = productsFinally.map(p => p.name);
    expect(contents).not.toContain(oldName);
    expect(contents).toContain('newName');
  });
  test('updating a product category removes it from earlier category' +
    ' and adds it to new one', async () => {
    const productsAtStart = await helper.productsInDB();
    const productToUpdate = productsAtStart[0];
    const newCategoryName = helper.initialProducts[helper.initialProducts.length - 1].category;
    const productId = productToUpdate.id;
    productToUpdate.category = newCategoryName;

    await api
      .put(`/api/products/${productId}`)
      .send(productToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const categories = await helper.categoriesInDB();
    const nonUpdatedCategories = categories.filter(cat => cat.name !== newCategoryName);
    const productsInNonUpdatedCategories = nonUpdatedCategories
      .map(cat => cat.products)
      .reduce((acc, val) => acc.concat(val), [])
      .map(id => id.toString());
    const updatedCategoryProductIds = categories
      .find(cat => cat.name === newCategoryName)
      .products.map(id => id.toString());
    expect(updatedCategoryProductIds).toContain(productId.toString());
    expect(productsInNonUpdatedCategories).not.toContain(productId.toString());
  });

  test('Updating a product with a non-existing category creates a new category', async () => {
    const productsAtStart = await helper.productsInDB();
    const productToUpdate = productsAtStart[0];
    const newCategoryName = 'NonExistent CategoryName';
    productToUpdate.category = newCategoryName;

    await api
      .put(`/api/products/${productToUpdate.id}`)
      .send(productToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const categories = await helper.categoriesInDB();
    const categoryNames = categories.map(cat => cat.name);
    expect(categoryNames).toContain(newCategoryName);
  });

  test('a product can be deleted', async () => {
    const productsAtStart = await helper.productsInDB();
    const productToDelete = productsAtStart[0];

    await api
      .delete(`/api/products/${productToDelete.id}`)
      .expect(204);

    const productsFinally = await helper.productsInDB();
    expect(productsFinally).toHaveLength(helper.initialProducts.length - 1);
    const contents = productsFinally.map(p => p.name);
    expect(contents).not.toContain(productToDelete.name);
  });
  test('Deleting a product deletes it from the relevant category\'s list', async () => {
    const productsAtStart = await helper.productsInDB();
    const productToDelete = productsAtStart[0];

    await api
      .delete(`/api/products/${productToDelete.id}`)
      .expect(204);

    const categories = await helper.categoriesInDB();
    const productsInCategory = categories
      .find(c => c.id.toString() === productToDelete.category.toString())
      .products
      .map(each => each.toString());
    expect(productsInCategory).not.toContain(productToDelete.id.toString());
  });
});

describe('Illegal requests', () => {
  test('Getting Wrong category name returns a 404', async () => {
    await api
      .get('/api/products/category/nonExistingCategory')
      .expect(404);
  });

  test('Getting Wrong product id returns a 404', async () => {
    await api
      .get('/api/products/V3ry84d1D')
      .expect(400);
  });

  test('Deleting a wrong product id returns a 400', async () => {
    await api
      .delete('/api/products/V3ry84d1D')
      .expect(400);
  });

  test('Updating wrong product id returns a 400', async () => {
    await api
      .put('/api/products/V3ry84d1D')
      .expect(400);
  });

  test('Product needs to have a name', async () => {
    const noNameProd = { category: 'fiddlesticks' };
    await api
      .post('/api/products')
      .send(noNameProd)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
  test('Product needs to have a category', async () => {
    const noCatProd = { name: 'fiddlesticks' };
    await api
      .post('/api/products')
      .send(noCatProd)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
  test('NO duplicate products', async () => {
    const newProduct = {
      name: 'Skoda',
      category: 'Cars'
    };
    await api
      .post('/api/products')
      .send(newProduct)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/products')
      .send(newProduct)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
