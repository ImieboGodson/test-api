const express = require('express');
const brcypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const {
    createProduct,
    getAllProducts,
    getProduct,
    UpdateProductDetails,
    deleteProduct
 } = require('./controllers/product');

const PORT = process.env.PORT || 5055;

const {
    DATABASE_NAME,
    DATABASE_PORT,
    DATABASE_USER,
    DATABASE_PASSWORD
} = process.env

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : DATABASE_PORT,
      user : DATABASE_USER,
      password : DATABASE_PASSWORD,
      database : DATABASE_NAME
    },
    ssl: {
        rejectUnauthorized: false
    }
});


app.get('/api/products', (req, res) => { getAllProducts(req, res, knex) });
app.post('/api/products', (req, res) => { createProduct(req, res, knex) });
app.get('/api/products/:id', (req, res) => { getProduct(req, res, knex) });
app.put('/api/products/:id', (req, res) => { UpdateProductDetails(req, res, knex) });
app.delete('/api/products/:id', (req, res) => { deleteProduct(req, res, knex) });



app.listen(PORT, () => {
    console.log(`Server is Listening at ${PORT}`);
})