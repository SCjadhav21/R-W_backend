const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  product_name: { type: String, required: true },
  product_image: { type: String, required: true, unique: true },
  colors_avl: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_desc: { type: String, required: true },
  userId: { type: String },
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
