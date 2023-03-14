const express = require('express');
const { addProducts, getProducts, updateProducts, deleteProducts,getSingleProduct } = require('../controllers/productController');
const router = express.Router();


router.route('/').get(getProducts).post(addProducts);
router.route('/:id').put(updateProducts).delete(deleteProducts).get(getSingleProduct)


module.exports = router;