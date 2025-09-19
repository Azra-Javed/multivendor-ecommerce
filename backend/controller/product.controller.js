const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const Product = require("../model/product");
const cloudinary = require("cloudinary");
const Order = require("../model/order.model");

//@desc: Create product
//@route: POST /api/vs/product/create-product
const createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid", 400));
    }

    const imageFiles = req.files?.images;
    let images = [];

    if (imageFiles) {
      // if single file uploaded
      if (!Array.isArray(imageFiles)) {
        const result = await cloudinary.v2.uploader.upload(
          imageFiles.tempFilePath,
          {
            folder: "products",
          }
        );
        images.push({ public_id: result.public_id, url: result.secure_url });
      } else {
        // multiple files
        for (let file of imageFiles) {
          const result = await cloudinary.v2.uploader.upload(
            file.tempFilePath,
            {
              folder: "products",
            }
          );
          images.push({ public_id: result.public_id, url: result.secure_url });
        }
      }
    }

    const productData = {
      ...req.body,
      images,
      shop,
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message || error, 400));
  }
});

//@desc: get all products of a shop
//@route: GET /api/vs/product/get-all-products-shop/:id
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

//@desc: get all products
//@route: GET /api/vs/product/get-all-products
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(201).json({
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
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Delete images from Cloudinary
    for (const image of product.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // Delete product from DB
    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: create review
//@route: PUT /api/v2/product/create-new-review/

const createReview = catchAsyncErrors(async (req, res, next) => {
  const { user, rating, comment, productId, orderId } = req.body;

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user._id.toString() === req.user._id.toString()
  );

  await Order.findByIdAndUpdate(
    orderId,
    { $set: { "cart.$[elem].isReviewed": true } },
    { arrayFilters: [{ "elem._id": productId }] }
  );
  const review = {
    user,
    rating,
    comment,
    productId,
  };

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user._id === req.user._id) {
        rev.rating = rating;
        rev.comment = comment;
        rev.user = user;
      }
    });
  } else {
    product.reviews.push(review);
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: isReviewed
      ? "Review updated successfully"
      : "Review added successfully",
  });
});

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  getAllProducts,
  createReview,
};
