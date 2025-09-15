const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const db_url = (process.env.MONGO_URL).replace('<db_password>',process.env.MONGO_PASSWORD);
const Order = require('./../models/orderModel');
const User = require('./../models/userModel');
const Product = require('./../models/productModel');

const products= JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

mongoose.connect(db_url).then((con) => {
    console.log('DB connection successful!');
    if (process.argv[2] == '--import') {
    importData();
    }
    else {
        deleteData();
    }
});
const importData = async () => {
    try {
        await Product.create(products);
        // await User.create(users, { validateBeforeSave: false });
        console.log("added");
    }
    catch (err) {
        console.log(err);
    }
    process.exit();
}
const deleteData = async () => {
    try {
        // await Product.deleteMany();
        await User.deleteMany();
        // await Order.deleteMany();
        console.log('deleted');
    }
    catch (err) {
        console.log(err);
    }
    process.exit();
}
