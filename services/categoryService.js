const Category = require('../models/categoryModel');

const createNewCategory = async (name) => {
  const category = new Category({
    name
  });
  await category.save();
  return category;
};

const getCategoryByName = async (name) => {
  const category =  await Category.findOne({ name }).exec();
  return category;
};

module.exports = {
  createNewCategory,
  getCategoryByName
};
