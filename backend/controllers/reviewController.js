const Product = require("./../models/productModel");
const catchAsyncError = require("./../utils/catchAsyncError");
const AppError = require("./../utils/AppError");

exports.postReview = catchAsyncError(async(req,res,next)=>{
    const currentProduct = await Product.findById(req.params.id);
    if(!currentProduct)
    {
        return next(new AppError('No such product exists', 404));
    }
    const pastReview = currentProduct.reviews.find((review)=>{
       return review.user.toString() === req.user._id.toString()
    })
    if(pastReview)
    {
        return next(new AppError('Already you have given your review', 404));
    }

    const review = {
        name: req.user.name,   
        rating: Number(req.body.rating),
        comment:req.body.comment,
        user: req.user._id
    }

    currentProduct.reviews.push(review);
    currentProduct.numReviews = currentProduct.reviews.length;
    currentProduct.rating =currentProduct.reviews.reduce((acc, item) => item.rating + acc, 0) /currentProduct.reviews.length;
    await currentProduct.save();

    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    });
});

exports.getReviews= catchAsyncError(async(req,res,next)=>{
    const currentProduct = await Product.findById(req.params.id).populate( { path: "reviews.user", select: "name email _id" });
    if(!currentProduct)
    {
        return next(new AppError('No such product exists', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            reviews : currentProduct.reviews
        }
    });
});

exports.updateReview= catchAsyncError(async(req,res,next)=>{
    const currentProduct = await Product.findById(req.params.id);
    if(!currentProduct)
    {
        return next(new AppError('No such product exists', 404));
    }
    const pastReview = currentProduct.reviews.find((review)=>{
        return review.user.toString() === req.user._id.toString()
    })
    if(!pastReview)
    {
        return next(new AppError('No review of yours exist', 404));
    }

    pastReview.comment = req.body.comment;
    pastReview.rating=req.body.rating;
    currentProduct.rating =currentProduct.reviews.reduce((acc, item) => item.rating + acc, 0) /currentProduct.reviews.length;
    await currentProduct.save();

    res.status(200).json({
        status: 'success',
        data: {
            pastReview
        }
    });
});

