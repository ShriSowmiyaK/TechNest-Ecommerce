const express = require("express");
const router = express.Router();
const { createOrder,updateOrder,deleteOrder ,getAllOrders,getOrder} = require("./../controllers/orderController");
const authController = require("./../controllers/authController");

router.use(authController.protect);
router.route("/")
    .post(createOrder);



router.use(authController.restrictTo("admin"))
router.get("/", getAllOrders);
router.get("/:id",getOrder);


router.route("/:id")
    .patch(updateOrder)
    .delete(deleteOrder);
module.exports = router;