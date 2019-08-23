const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route');
const mongoose = require('mongoose');

const app = express();
let port = 3000;

let dev_db_url = 'mongodb://admin:password1@ds163757.mlab.com:63757/productstutorial'
let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', product);

app.listen(port, () => {
    console.log(`Server is up and running on port number ${port}`);
});