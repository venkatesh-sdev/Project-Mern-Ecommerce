const express = require('express');
const { addProducts, getProducts, updateProducts, deleteProducts,getSingleProduct } = require('../controllers/productController');
const { protectRoutes, protectRoles } = require('../middleware/checkAuthMid');
const router = express.Router();


router.route('/')
.get(protectRoutes,getProducts)
.post(protectRoutes,protectRoles('admin'),addProducts);

router.route('/:id')
.put(protectRoutes,protectRoles('admin'),updateProducts)
.delete(protectRoutes,protectRoles('admin'),deleteProducts)
.get(protectRoutes,getSingleProduct)


module.exports = router;