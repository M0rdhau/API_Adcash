const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const initialProducts = [
  {
    name: 'Nuka Cola',
    category: 'Drinks'
  },
  {
    name: 'Cherry Punch',
    category: 'Drinks'
  },
  {
    name: 'Belgian Ale',
    category: 'Drinks'
  },
  {
    name: 'Weizen Bier',
    category: 'Drinks'
  },
  {
    name: 'Little Boy',
    category: 'Warheads'
  },
  {
    name: 'Fat Man',
    category: 'Warheads'
  },
  {
    name: 'V1',
    category: 'Warheads'
  }
];

const initialCategories = initialProducts
  .map(p => p.category)
  // remove non-unique categories from the list
  .filter((p, ind, arr) => {
    return arr.indexOf(p) === ind;
  });

const productsInDB = async () => {
  const products = await Product.find({});
  return products.map(p => p.toJSON());
};

const productsInDBCategory = async (id) => {
  const products = await Product.find({ category: id });
  return products.map(p => p.toJSON());
};

const categoriesInDB = async () => {
  const categories = await Category.find({});
  return categories.map(p => p.toJSON());
};

module.exports = {
  initialProducts,
  initialCategories,
  productsInDB,
  productsInDBCategory,
  categoriesInDB
};
