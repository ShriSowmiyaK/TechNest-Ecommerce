const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require("hpp");
const qs = require("qs");
const morgan = require("morgan");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorHandler");
const app = express();
app.use(cookieParser());
app.use((req, res, next) => {
    Object.defineProperty(req, 'query', {
        ...Object.getOwnPropertyDescriptor(req, 'query'),
        value: req.query,
        writable: true,
    });
    next();
});

//data sanization against nosql query injection-filters all $ and .
app.use(mongoSanitize());

// app.use((req, res, next) => {
//     console.log("Sanitization by mongo-sanitize");    
//     console.log("Sanitized Query:", req.query);
//     next();
// });


//data sanization against xss
app.use(xss());

//headers will be surely set
//set security http headers
app.use(helmet());

//development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

//parsing url when passing $gt $lt according to mongo
app.set("query parser", (str) => qs.parse(str));

//200 req in 1 hr
const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: "too many requests from this ip , please try again later"
})

//Limit req from same api 
app.use("/api", limiter);

//test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

//body parser , reading data from body into req.body-limit body data to 10kb
app.use(express.json({
    limit: "10kb"
}));


//prevent parameter pollution (we give sort by date and sort by maxval then throws err - we can whitelist some parameters)
app.use(hpp({
    whitelist: [
        'category',
        'rating',
        'brand',
        'price',
        'name'
    ]
}));

//routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);


//handling invalid routes
app.all("/api/*", (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
})

//handling global errors
app.use(globalErrorHandler);

module.exports = app;
