const Shop = require("../model/shop");
const Product = require("../model/product");
const Event = require("../model/events.model");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendShopToken = require("../utils/shopToken");

//activation token
const createActivationToken = (shop) => {
  return jwt.sign(shop, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//@desc: create new shop
//@route: POST /api/v2/shop/shop-create

const createShop = async (req, res, next) => {
  try {
    const { name, email, password, address, phoneNumber, zipCode } = req.body;
    const file = req.files.file;

    // Check if seller already exists
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return next(new ErrorHandler("Seller already exists", 400));
    }

    let myCloud;
    if (file) {
      // Upload avatar  to Cloudinary
      myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "shops",
      });
    }

    const seller = {
      name,
      email,
      password,
      avatar: myCloud
        ? { public_id: myCloud.public_id, url: myCloud.secure_url }
        : undefined,
      address,
      phoneNumber,
      zipCode,
    };

    // Create activation token
    const activationToken = createActivationToken(seller);

    const activationUrl = `https://multivendor-ecommerce-l46n.vercel.app/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your Shop account",
        message: `Hello ${seller.name}, please click on the link to activate your shop account: ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email: ${seller.email} to activate your shop account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

//@desc: activate Shop
//@route: POST /api/v2/shop/shop/activation
const activateShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const newSeller = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET
    );

    if (!newSeller) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    const { name, email, password, avatar, zipCode, address, phoneNumber } =
      newSeller;

    let seller = await Shop.findOne({ email });

    if (seller) {
      return next(new ErrorHandler("Seller already exists", 400));
    }

    seller = await Shop.create({
      name,
      email,
      avatar,
      password,
      address,
      phoneNumber,
      zipCode,
    });

    sendToken(seller, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: login shop
//@route: POST /api/v2/shop/login-shop
const shopLogin = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const seller = await Shop.findOne({ email }).select("+password");

    if (!seller) {
      return next(new ErrorHandler("Seller doesn't exists!", 400));
    }

    const isPasswordValid = await seller.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    sendShopToken(seller, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: getShop
//@route: GET /api/v2/shop/getShop

const getSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.seller.id);
    if (!seller) {
      return next(new ErrorHandler("Seller doesn't exists!", 400));
    }

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: logout from shop
//@route: Delete /api/v2/shop/logoutShop
const logoutShop = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "Logout Successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: get shop info
//@route: GET /api/v2/shop/get-shop-info/:id

const getShopInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: update shop avatar
//@route: PUT /api/vs/shop/update-avatar/:id
const updateAvatar = catchAsyncErrors(async (req, res, next) => {
  const shop = await Shop.findById(req.params.id);
  if (!shop) return next(new ErrorHandler("Shop not found", 404));

  if (!req.files || !req.files.avatar) {
    return next(new ErrorHandler("No file uploaded", 400));
  }

  // Delete old avatar from Cloudinary
  if (shop.avatar?.public_id) {
    await cloudinary.v2.uploader.destroy(shop.avatar.public_id);
  }

  // Upload new avatar
  const result = await cloudinary.v2.uploader.upload(
    req.files.avatar.tempFilePath,
    { folder: "shops" }
  );

  // Remove temp file
  const fs = require("fs");
  fs.unlinkSync(req.files.avatar.tempFilePath);

  shop.avatar = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  await shop.save();

  // Update avatar in all products of this shop
  await Product.updateMany(
    { shopId: shop._id },
    { $set: { "shop.avatar": shop.avatar } }
  );

  // Update all events of this shop
  await Event.updateMany(
    { shopId: shop._id },
    { $set: { "shop.avatar": shop.avatar } }
  );

  res.status(200).json({
    success: true,
    shop,
  });
});

//@desc: update seller info
//@route: PUT /api/shop/v2/update-user-info
const updateSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, description, address, phoneNumber, zipCode } = req.body;

    const shop = await Shop.findOne(req.seller._id);

    if (!shop) {
      return next(new ErrorHandler("Shop not found", 400));
    }

    shop.name = name;
    shop.description = description;
    shop.address = address;
    shop.phoneNumber = phoneNumber;
    shop.zipCode = zipCode;
    await shop.save();

    res.status(200).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: get all sellers for admin
//@route: GET/api/shop/v2/admin-sellers

const getAdminSellers = catchAsyncErrors(async (req, res, next) => {
  try {
    const sellers = await Shop.find();

    res.status(200).json({
      success: true,
      sellers,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: delete seller -> admin
//@route: DELETe /api/shop/v2/delete-seler:id

const deleteSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.params.id);

    if (!seller) {
      return next(new ErrorHandler("Seller not exist!", 404));
    }

    await Shop.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Seller deleted Successfull!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: upate seller withdraw methods --> sellers
//@route: PUT /api/shop/v2/update-seller-methods

const sellerPaymentMethods = catchAsyncErrors(async (req, res, next) => {
  try {
    const { withdrawMethod } = req.body;

    const seller = await Shop.findByIdAndUpdate(req.seller._id, {
      withdrawMethod,
    });

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: delete withdraw method --> sellers
//@route: PUT /api/shop/v2/delete-withdraw-method

const deleteWithdraw = catchAsyncErrors(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.seller._id);

    if (!seller) {
      return next(new ErrorHandler("Seller not found with this id!", 400));
    }

    seller.withdrawMethod = null;
    seller.save();

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createShop,
  activateShop,
  shopLogin,
  getSeller,
  logoutShop,
  getShopInfo,
  updateAvatar,
  updateSeller,
  getAdminSellers,
  deleteSeller,
  sellerPaymentMethods,
  deleteWithdraw,
};
