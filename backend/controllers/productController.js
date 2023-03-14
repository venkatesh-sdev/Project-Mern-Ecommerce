const Product = require('../database/models/productModel');
const asyncHandler = require('express-async-handler');

// Getting All Products 
exports.getProducts = asyncHandler(async (req, res) => {
    const product = await Product.find();
    if (!product) {
        return res.status(404).json({
            message: "Product Not Found"
        })
    }
    res.status(200).json({ product });
})
//  Get Single Product
exports.getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            message: "Product Not Found"
        })
    }
    res.status(200).json({ product })
})

// Adding a Product 
exports.addProducts = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body)
    res.status(201).json({ product });
})

// Updating a Product
exports.updateProducts = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    if (!id || !body) {
        return res.status(400).json({
            message: "Missing Data For Finding Product"
        })
    }
    let product = await Product.findById(id);
    if (!product) {
        res.status(404).json({
            message: 'Product Not Found'
        })
    }
    product = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    res.status(200).json({ product });
})

// Deleting The Product
exports.deleteProducts = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({
            message: "Missing Data For Finding Product"
        })
    }
    const product = await Product.findByIdAndDelete(id)
    res.status(200).json({ product });
})

