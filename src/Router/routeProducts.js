const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} = require('../Controller/productsController');
const validations = require('../Middlewares/validations');
const fieldValidation = require('../Middlewares/fieldValidations');
const router = Router();

router.get(
  '/',
  [
    query('name').isString().trim(),
    query('brand').isString().trim(),
    query('stock').isString().trim(),
    query('description').isString().trim(),
    query('price').isString().trim(),
  ],
  getProducts
);

router.get(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  getProduct
);

router.post('/', [...validations(), fieldValidation], 
postProduct);

router.put(
  '/:id',
  [param('id').isMongoId(), ...validations(), fieldValidation],
  putProduct
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  deleteProduct
);


module.exports = router;
