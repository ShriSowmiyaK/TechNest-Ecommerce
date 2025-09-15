const Order = require("./../models/orderModel");
const { deleteOne, updateOne, createOne, getOne, getAll } = require("./handleFactory");

exports.createOrder = createOne(Order);
exports.getAllOrders = getAll(Order);
exports.getOrder = getOne(Order);
exports.updateOrder = updateOne(Order);
exports.deleteOrder = deleteOne(Order);