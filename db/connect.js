const mongoose = require("mongoose");



const connectDB = (uri) => {
  console.log("database connected..");
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB
