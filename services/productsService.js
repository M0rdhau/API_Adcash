const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const createProduct = async (body) => {
  name = body.name;
  categoryName = body.name;

  let category = await Category.find({name: categoryName}).exec();

  if(category){
    category = new Category({
      name: categoryName
    });
    category = await category.save();
  }

  console.log("category:", category);

  const product = new Product({
    name: name,
    category: category.id
  });

  const savedProduct = await product.save();
  category.products = category.products.concat(savedProduct.id);
  await category.save();
  return savedProduct;
}

module.exports = {
  createProduct
}
