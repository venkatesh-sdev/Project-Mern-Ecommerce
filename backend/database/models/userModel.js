const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter UserName"]
    }, email: {
        type: String,
        required: [true, "Please Enter Email"],
        unique: [true, "Email Already Exists"],
        validate: [validator.isEmail, "Please Enter a Valid Email"]
    }, password: {
        type: String,
        required: [true, "Please Enter Password"],
        minlength: [8, "Password atleast Contains Eight Characters"],
        select: false
    }, role: {
        type: String,
        default: 'user'
    }, avatar: {
        type: String,
        required: true
    },
    passwordResetToken: String,
    passwordResetTokenExprie: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

UserSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.getJsonToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPRIE })
}

UserSchema.methods.AuthUser = async function(password){
   return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", UserSchema)