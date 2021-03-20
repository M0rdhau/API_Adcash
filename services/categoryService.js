const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

const getAllCategories = async () => {
  return Category
    .find({})
    .populate('products', { name: 1 });
};

const getCategoryByName = async (name) => {
  return await Category.findOne({ name }).exec();
};

const createNewCategory = async (name) => {
  const category = new Category({
    name
  });
  await category.save();
  return category;
};

const updateCategory = async (body, id) => {
  const updateCat = { name: body.name };
  return Category.findByIdAndUpdate(id, updateCat, { new: true });
};

const deleteCategory = async (id) => {
  const category = await Category.findById(id);
  const productIds = category.products.map(e => e.toString());
  for(let productId of productIds){
    await Product.findByIdAndRemove(productId);
    console.log('removed');
  }
  await Category.findByIdAndRemove(id).exec();
};

module.exports = {
  getAllCategories,
  getCategoryByName,
  createNewCategory,
  updateCategory,
  deleteCategory
};
