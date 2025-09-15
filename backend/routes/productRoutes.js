const express = require("express");
const router = express.Router();
const { createProduct,updateProduct,deleteProduct ,getAllProducts,getProduct} = require("./../controllers/productController");
const {getReviews,postReview,updateReview} = require("./../controllers/reviewController")
const authController = require("./../controllers/authController");

router.use(authController.protect);

router.get("/", getAllProducts);
router.get("/:id",getProduct);
router.route("/reviews/:id")
    .get(getReviews)
    .post(postReview)
    .patch(updateReview);

router.use(authController.restrictTo("admin"))

router.route("/")
    .post(createProduct);

router.route("/:id")
    .patch(updateProduct)
    .delete(deleteProduct);
module.exports = router;