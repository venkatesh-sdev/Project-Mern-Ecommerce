const User = require('../database/models/userModel');
const ErrorHandler = require('../utils/ErrorHandler');
const asyncHandler = require('./asyncHandler');
const jwt = require('jsonwebtoken');

exports.protectRoutes = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        next(new ErrorHandler("Login To Access Products", 400))
    }

    const {id} = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(id)
    next();
})

exports.protectRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`, 401))
        }
        next()
    }
}  