const Product = require("./../models/productModel");
const { deleteOne, updateOne, createOne, getOne, getAll } = require("./handleFactory");

exports.createProduct = createOne(Product);
exports.getAllProducts = getAll(Product);
exports.getProduct = getOne(Product, { path: "reviews.user", select: "name email _id" });
exports.updateProduct = updateOne(Product);
exports.deleteProduct = deleteOne(Product);