const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select, page, limit } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    queryObject.featured = featured;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let pages = Number(page) || 1;
  let limits = Number(limit);

  let skip = (pages - 1) * limits;

  apiData = apiData.skip(skip).limit(limits);

  const products = await apiData;

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts };
