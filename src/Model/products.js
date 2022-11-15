const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  brand: {//lastname
    type: String,
    required: [true, 'Brand is required'],
  },
  stock: {//telephone
    type: String,
    required: [true, 'Stock is required'],
  },
  description: {//direction
    type: String,
    required: [true, 'Description is required'],
  },
  price: {//dni
    type: String,
    required: [true, 'Price is required'],
  },
});

module.exports = model('Product', ProductSchema);
