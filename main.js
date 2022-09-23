const express = require('express');
const brcypt = require('bcrypt');
const cors = require('cors');
const {
    createProduct,
    getAllProducts,
    getProduct,
    UpdateProductDetails
 } = require('./controllers/product');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 5055;

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'test',
      database : 'test_db'
    },
    ssl: {
        rejectUnauthorized: false
    }
});


app.get('/api/products', (req, res) => { getAllProducts(req, res, knex) });
app.post('/api/products', (req, res) => { createProduct(req, res, knex) });
app.get('/api/products/:id', (req, res) => { getProduct(req, res, knex) });
app.put('/api/products/:id', (req, res) => { UpdateProductDetails(req, res, knex) });



app.listen(PORT, () => {
    console.log(`Server is Listening at ${PORT}`);
})