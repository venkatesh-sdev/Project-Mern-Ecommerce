const Product = require('../database/models/productModel');
const jsonData = require('../json/data.json');
require('dotenv').config();
require('../database/db')();

const seedData = async () => {
    try {
        await Product.deleteMany();
        console.log("Product Deleted")
        await Product.insertMany(jsonData)
        console.log("Products Added");
        process.exit();
    } catch (error) {
        console.log(error)
    }
}

seedData();