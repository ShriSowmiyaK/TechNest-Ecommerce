const dotenv = require('dotenv');
dotenv.config();
const app = require("./app");
const mongoose = require('mongoose');
const express = require('express');
// const products = require("./data/products");
const port = process.env.PORT || 8000;

const db_url = (process.env.MONGO_URL).replace('<db_password>',process.env.MONGO_PASSWORD);

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION - Shutting down');
    process.exit(1);
});

mongoose.connect(db_url).then((con) => {
    console.log('DB connection successful!');
});

const server = app.listen(port, () => {
    console.log("running on 8000")
})
process.on("unhandledRejection", err => {
    console.log(err.name, err.message);
    console.log("Unhandled Rejection - SHUTTING DOWN");
    server.close(() => {
        process.exit(1);
    })
})