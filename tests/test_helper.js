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

const productsInDB = async () => {
  const products = await Product.find({});
  return products.map(p => p.toJSON());
};

module.exports = {
  initialProducts,
  productsInDB
};
