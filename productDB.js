require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const Product = require("./models/product");

const productJson = require("./products.json");

mongoose.set("strictQuery", false);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    await Product.deleteMany();
    await Product.create(productJson);
    console.log("Data added success...");
  } catch (error) {
    console.log(error);
  }
};

start();
