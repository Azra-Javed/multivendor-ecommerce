const path = require("path");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
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
    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("Seller already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const seller = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
      address: address,
      phoneNumber: phoneNumber,
      zipCode: zipCode,
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;
    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your Shop account",
        message: `Hello ${seller.name}, please click on the link to activate your shop account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your shop account!`,
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
//@route: PUT /api/vs/shop/update-avatar

const updateAvatar = catchAsyncErrors(async (req, res, next) => {
  const existShop = await Shop.findById(req.seller._id);
  console.log(existShop.avatar);
  console.log(req.body.image);

  if (existShop.avatar) {
    const existsAvatarPath = path.join(
      __dirname,
      "..",
      "uploads",
      existShop.avatar
    );

    if (fs.existsSync(existsAvatarPath)) {
      fs.unlinkSync(existsAvatarPath);
    }
  }

  const fileUrl = req.file.filename;

  const seller = await Shop.findByIdAndUpdate(
    req.seller._id,
    { avatar: fileUrl },
    { new: true }
  );

  res.status(200).json({
    success: true,
    seller,
  });

  try {
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
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
};
