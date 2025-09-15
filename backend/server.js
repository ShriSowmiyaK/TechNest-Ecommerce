const app = require("./app");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
// const products = require("./data/products");
dotenv.config();
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

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  });
}

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