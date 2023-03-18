const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./database/db')();
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandleMiddleware');
const cookieParsrer = require('cookie-parser')


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(cookieParsrer())
app.use(express.urlencoded({ extended: true }))

app.use('/api/get/products', productRoutes);
app.use('/api/user', authRoutes);

app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log("Server Started At http://localhost:" + PORT)
})

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    })
})
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    })
})