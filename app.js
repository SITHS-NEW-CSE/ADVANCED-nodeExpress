const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// import routers
const indexRouter = require("./routes/index");
const productRouter = require("./routes/product");
const apiRouter = require("./routes/api");

const app = express();

// view engine setup (defining handlebars.js as our templating engine)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// these are all global "Middleware", callback functions which run throughout the entire project
// (e.g. you want to format all incoming data). We'll cover this later.
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
// use app.use() to assign a route to a router object
// (routes in productRouter will require `/product` prepended)
app.use("/", indexRouter);
app.use("/product", productRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
