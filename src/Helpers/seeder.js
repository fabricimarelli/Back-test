const Product = require('../Model/products');
const bcrypt = require('bcrypt');

const pwd = 'test1234';

const seeder = async () => {
  const existingProduct = await Product.findOne();
  if (existingProduct) return;
  console.log('No product was found, creating one...');

  const product = new Product();
  product.email = 'product@mail.com';
  product.name = 'Jabon';
  product.brand = 'Dove';
  product.stock = '45';
  product.description = 'Jabon de tocador';
  product.price = '2564';
  product.password = await bcrypt.hash(pwd, 12);

  await product.save();
  console.log(`[Product created] \nemail: ${product.email} \npassword: ${pwd} `);
};

module.exports = seeder;
