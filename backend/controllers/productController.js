const Product = require('../database/models/productModel');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorHandler = require('../utils/ErrorHandler');
const ApiService = require('../utils/ApiService')

// Getting All Products 
exports.getProducts = asyncHandler(async (req, res, next) => {
    const product = await new ApiService(Product.find(),req.query).search().filter().paginate();
    res.status(200).json({ success: true, product: await product.query });
})
//  Get Single Product
exports.getSingleProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 400));
    }

    res.status(201).json({
        success: true,
        product
    })
})

// Adding a Product 
exports.addProducts = asyncHandler(async (req, res, next) => {
    const product = await Product.create(req.body)
    res.status(200).json({ success: true, product });
})

// Updating a Product
exports.updateProducts = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    let product = await Product.findById(id);
    console.log(product)
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 400))
    }
    product = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    res.status(200).json({ success: true, product });
})

// Deleting The Product
exports.deleteProducts = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 400))
    }
    await Product.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: "Product Deleted Successfully" });
})