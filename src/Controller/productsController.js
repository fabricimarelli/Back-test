const { request, response } = require('express');
const Product = require('../Model/products');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getProducts = async (req = request, res = response) => {
  try {
    const { name, brand, stock, description, price, email } = req.query;
    let termsProduct = {};

    if (name) {
      const regex = new RegExp(name, 'i');
      termsProduct.name = { $regex: regex };
    }
    if (brand) {
      const regex = new RegExp(brand, 'i');
      termsProduct.brand = { $regex: regex };
    }
    if (stock) {
      const regex = new RegExp(stock, 'i');
      termsProduct.stock = { $regex: regex };
    }
    if (description) {
      const regex = new RegExp(description, 'i');
      termsProduct.description = { $regex: regex };
    }
    if (price) {
      const regex = new RegExp(price, 'i');
      termsProduct.price = { $regex: regex };
    }
    if (email) {
      const regex = new RegExp(email, 'i');
      termsProduct.email = { $regex: regex };
    }
    const products = await Product.find(termsProduct);
    res.send(products);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};

const getProduct = async (req = request, res = response) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const postProduct = async (req = request, res = response) => {
  try {
    const product = new Product(req.body);
    const productExist = await Product.findOne({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
    });
    if (productExist) {
      res.status(400).json({
        error: 'Error, existing product',
      });
    } else {
      if(product.password){
        product.password = await bcrypt.hash(req.body.password, 12);

      }
      await product.save();
      res.status(201).json({ message:'Product added successfully', data: product });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const putProduct = async (req = request, res = response) => {
  try {
    const productId = req.params.id;
    let product = req.body;

    const productExist = await Product.findOne({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      _id: { $ne: productId },
    });
    if (productExist) {
      return res.status(400).json({
        error: 'Error, existing product',
      });
    } else {
      product = await Product.findByIdAndUpdate(productId, product, {
        new: true,
      });
    }
    if (product) {
      res.json({ data: product });
    } else {
      res.status(404).json({ error: 'Product doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const deleteProduct = async (req = request, res = response) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (product) {
      res.json({ message: 'Product deleted successfully', data: product });
    } else {
      res.status(404).json({ error: 'Product doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
  /*login,*/
};
