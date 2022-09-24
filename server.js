const express = require('express');
const brcypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const product = require('./controllers/product');

const PORT = process.env.PORT || 5055;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});


app.get('/api/products', product.getAllProducts(knex));
app.post('/api/products/add', product.createProduct(knex));
app.get('/api/products/:id', product.getProduct(knex));
app.put('/api/products/update', product.UpdateProductDetails(knex));
app.delete('/api/products/delete', product.deleteProduct(knex));



app.listen(PORT, () => {
    console.log(`Server is Listening at ${PORT}`);
})