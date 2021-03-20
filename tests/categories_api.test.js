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

describe('getting categories from database', () => {
  test('request returns correct amount of categories', async () => {
    const response = await api.get('/api/categories/');
    const categories = helper.initialCategories;
    expect(response.body).toHaveLength(categories.length);

    // flatten the array and extract names - category endpoint should also
    // return names of the products in the categories
    const extractedProducts = response.body
      .map(cat => cat.products)
      .reduce((acc, val) => acc.concat(val), [])
      .map(product => product.name);

    const productNames = helper.initialProducts.map(p => p.name);
    expect(extractedProducts).toEqual(productNames);
  });
});

describe('Manipulating the database', () => {
  test('creating a new category', async () => {
    const newCategory = {
      name: 'Electronics'
    };

    await api
      .post('/api/categories')
      .send(newCategory)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const categoriesFinally = await helper.categoriesInDB();
    expect(categoriesFinally).toHaveLength(helper.initialCategories.length + 1);

    const contents = categoriesFinally.map(p => p.name);
    expect(contents).toContain('Electronics');
  });
  test('a category can be updated', async () => {
    const categoriesAtStart = await helper.categoriesInDB();
    const catToUpdate = categoriesAtStart[0];
    const oldName = categoriesAtStart.name;
    const newName = 'newName';
    catToUpdate.name = newName;

    await api
      .put(`/api/categories/${catToUpdate.id}`)
      .send(catToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const categoriesFinally = await helper.categoriesInDB();
    expect(categoriesFinally).toHaveLength(helper.initialCategories.length);

    const contents = categoriesFinally.map(p => p.name);
    expect(contents).not.toContain(oldName);
    expect(contents).toContain(newName);
  });
  test('a category can be deleted', async () => {
    const categoriesAtStart = await helper.categoriesInDB();
    const catToDelete = categoriesAtStart[0];

    await api
      .delete(`/api/categories/${catToDelete.id}`)
      .expect(204);

    const categoriesFinally = await helper.categoriesInDB();
    expect(categoriesFinally).toHaveLength(helper.initialCategories.length - 1);

    const contents = categoriesFinally.map(p => p.name);
    expect(contents).not.toContain(catToDelete.name);
  });
});

describe('Illegal requests', () => {
  test('Category needs to have a name', async () => {
    const noNameCategory = {  };
    await api
      .post('/api/categories')
      .send(noNameCategory)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
  test('NO duplicate categories', async () => {
    const newCategory = {
      name: 'Electronics'
    };
    await api
      .post('/api/categories')
      .send(newCategory)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/categories')
      .send(newCategory)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
