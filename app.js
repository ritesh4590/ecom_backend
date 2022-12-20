require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const product_routes = require("./routes/products");
const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);

app.get("/", (req, res) => {
  res.send("Server is running....");
});

// Middleware
app.use("/api/products", product_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, (req, res) => {
      console.log(`server is runnimg at ${PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
