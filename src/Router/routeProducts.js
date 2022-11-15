const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
  /*login,*/
} = require('../Controller/productsController');
const validations = require('../Middlewares/validations');
const loginValidations = require('../Middlewares/loginvalidations');
const fieldValidation = require('../Middlewares/fieldValidations');
const isLoggedIn = require('../Middlewares/isLoggedIn');
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
/*isLoggedIn,*/ 
postProduct);

router.put(
  '/:id',
  [param('id').isMongoId(), ...validations(), fieldValidation],
  /*isLoggedIn,*/
  putProduct
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  /*isLoggedIn,*/
  deleteProduct
);

//router.post('/login', [...loginValidations(), fieldValidation], login);

module.exports = router;
