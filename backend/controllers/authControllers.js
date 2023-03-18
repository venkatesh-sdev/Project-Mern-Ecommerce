const asyncHandler = require('../middleware/asyncHandler');
const User = require('../database/models/userModel');
const bcrypt = require('bcryptjs')
const ErrorHandler = require('../utils/ErrorHandler');
const sendToken = require('../utils/Token');


exports.authRegister = asyncHandler(async (req, res, next) => {
    const { name, email, password, avatar } = req.body;
    if (!name || !email || !password || !avatar) {
       return next(new ErrorHandler('Data inSufficient', 400))
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
        next(new ErrorHandler('Email Already Exists', 400))
    }
    const user = await User.create({
        name, email, password, avatar
    })
    user.save()
    sendToken(user,201,res)
})


exports.authLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler('Data inSufficient', 400))
    }
    const user = await User.findOne({ email }).select('+password');
    
    const AuthUser = user.AuthUser(password);
    if (!user || !AuthUser) {
        next(new ErrorHandler("Invalid Credentials",401));
    } 
    sendToken(user, 201, res)
})

