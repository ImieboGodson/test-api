const express = require('express');
const brcypt = require('bcrypt');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is Listening at ${PORT}`);
})