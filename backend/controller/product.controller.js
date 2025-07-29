const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const Product = require("../model/product");

//@desc: Create product
//@route: POST /api/vs/product/create-product
const createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;

    const shop = await Shop.findById(shopId);

    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid", 400));
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);
      const productData = req.body;
      productData.images = imageUrls;
      productData.shop = shop;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//@desc: get all products
//@route: POST /api/vs/product/get-all-products-shop/:id
const getProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.id });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//@desc: delete a product
//@route: DELETE /api/v2/product/delete-shop-product/:id

const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = { createProduct, getProducts, deleteProduct };
