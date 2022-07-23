const express = require('express');

const { connectDB } = require('./config/connectDB');
const { errorHandler, invalidURL } = require('./middlewares/songMiddleware');
const { songRoutes } = require("./routes/songRoutes");

connectDB()
const app = express();

const port = process.env.PORT || 4000;
app.listen(port, () => { console.log("Server Connected " + port) })

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }))

// for parsing application/json
app.use(express.json())

// const formData = require("express-form-data");
// for parsing multipart/form-data
// app.use(formData.parse())
// app.use(formData.union())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/songAPI', songRoutes)
app.use(invalidURL)
app.use(errorHandler)
