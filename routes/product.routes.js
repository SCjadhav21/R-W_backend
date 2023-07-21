const express = require("express");
const { ProductModel } = require("../models/product.model");
const { Authentication } = require("../middelware/authentication");

const ProductRoute = express.Router();

ProductRoute.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
ProductRoute.get("/myproduct", Authentication, async (req, res) => {
  let userId = req.body.userId;
  try {
    const products = await ProductModel.find({ userId: userId });
    res.status(200).send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

ProductRoute.post("/", Authentication, async (req, res) => {
  let {
    product_name,
    product_image,
    colors_avl,
    product_price,
    product_desc,
    userId,
  } = req.body;

  try {
    let product = new ProductModel({
      product_name,
      product_image,
      colors_avl,
      product_price,
      userId,
      product_desc,
    });
    await product.save();
    res.status(200).send("product added successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

ProductRoute.delete("/:id", Authentication, async (req, res) => {
  let id = req.params.id;

  try {
    const product = await ProductModel.deleteOne({
      _id: id,
    });
    res.status(200).send("product details deleted successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
});
ProductRoute.patch("/:id", Authentication, async (req, res) => {
  let id = req.params.id;
  let payload = req.body;

  try {
    const product = await ProductModel.updateOne(
      {
        _id: id,
      },
      payload
    );
    res.status(200).send("product details updated successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = { ProductRoute };
