const { body } = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validationStringContainNumbers');

const validations = () => {
  return [
    body('name', 'Name is required').notEmpty().isString().trim(),
    body('brand', 'Brand is required').notEmpty().isString().trim(),
    body('stock', 'Stock is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('description', 'Description  is required').notEmpty().isString().trim(),
    body('price', 'Price is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
  ];
};

module.exports = validations;

//OK