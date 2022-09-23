const express = require('express');
const brcypt = require('bcrypt');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 5055;

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : PORT,
      user : 'your_database_user',
      password : 'your_database_password',
      database : 'myapp_test'
    }
});


app.get('/api/', (req, res) => {
    res.send('HELLO WORLD, I AM ALIVE!!');
})

app.listen(PORT, () => {
    console.log(`Server is Listening at ${PORT}`);
})