const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const createNewCategory = async (name) => {
  const category = new Category({
    name: categoryName
  });
  await category.save();
  return category;
}


const createProduct = async (body) => {
  name = body.name;
  categoryName = body.category;

  let category = await Category.findOne({name: categoryName}).exec();

  console.log("category type: ", typeof category)
  console.log("category by name: ", category);

  if(!category){
    category = createNewCategory(categoryName);
  }

  console.log("category created: ", category);

  const product = new Product({
    name: name,
    category: category.id
  });

  const savedProduct = await product.save();
  category.products = category.products.concat(savedProduct.id);
  await category.save();
  return savedProduct;
}

const deleteProduct = async (id) => {
  await Product.findByIdAndRemove(id).exec();
}

const updateProduct = async (body, id) => {
  const productToUpdate = await Product.findById(id);
  console.log(productToUpdate);
  const categoryToUpdate = await Category.findById(productToUpdate.category);
  console.log(categoryToUpdate);
  name = body.name;
  categoryName = body.category;
  console.log("cat name: ", categoryName);
  let newCategory = await Category.findOne({name: categoryName}).exec();
  if(categoryName !== categoryToUpdate.name){
    categoryToUpdate.products = categoryToUpdate.products.filter(p => p.id !== id);
    await categoryToUpdate.save();
    console.log('new category: ', newCategory);
    if(!newCategory){
     newCategory = await createNewCategory(categoryName);
    }
    newCategory.products = newCategory.products.concat(id);
    await newCategory.save();
  }

  const product = {
    name,
    category: newCategory.id
  };

  return await Product.findByIdAndUpdate(id, product, {new: true});
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct
}
