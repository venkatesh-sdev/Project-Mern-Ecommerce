const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./database/db')();
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandleMiddleware');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/products', productRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server Started At http://localhost:" + PORT)
})