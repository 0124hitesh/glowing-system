const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/y_DB', { useNewUrlParser: true, useUnifiedTopology: true }).
        then(() => console.log("Connectedd")).
        catch((e) => { console.log(e) });
}

module.exports = {connectDB}