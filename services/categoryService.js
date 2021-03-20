const Category = require('../models/categoryModel');

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

module.exports = {
  getAllCategories,
  getCategoryByName,
  createNewCategory
};
