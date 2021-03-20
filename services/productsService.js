const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const categoryService = require('./categoryService');

const getAllProducts = async () => {
  return Product
    .find({})
    .populate('category', { name: 1 });
};

const getProductsByCategoryName = async (name) => {
  const category = await categoryService.getCategoryByName(name);
  return Product
    .find({ category: category.id });
};

const getProductById = async (id) => {
  return Product.findById(id);
};

const createProduct = async (body) => {
  const name = body.name;
  const categoryName = body.category;
  let category = await Category.findOne({ name: categoryName }).exec();

  if(!category){
    category = await categoryService.createNewCategory(categoryName);
  }

  const product = new Product({
    name: name,
    category: category.id
  });

  const savedProduct = await product.save();
  category.products = category.products.concat(savedProduct.id);
  await category.save();
  return savedProduct;
};

const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  const category = await Category.findById(product.category);
  const newCat = {
    products: category.products.filter(prod => prod.toString() !== id.toString())
  };
  await Category.findByIdAndUpdate(product.category, newCat, { new: true });
  await Product.findByIdAndRemove(id).exec();
};

const updateProduct = async (body, id) => {
  const productToUpdate = await Product.findById(id);
  const categoryToUpdate = await Category.findById(productToUpdate.category);

  const name = body.name;
  const categoryName = body.category;

  let newCategory = await Category.findOne({ name: categoryName }).exec();

  if(categoryName !== categoryToUpdate.name){

    categoryToUpdate.products = categoryToUpdate.products.filter(p => p.id !== id);
    await categoryToUpdate.save();

    if(!newCategory){
      newCategory = await categoryService.createNewCategory(categoryName);
    }
    newCategory.products = newCategory.products.concat(id);
    await newCategory.save();
  }

  const product = {
    name,
    category: newCategory.id
  };

  return Product.findByIdAndUpdate(id, product, { new: true });
};

module.exports = {
  getAllProducts,
  getProductsByCategoryName,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
