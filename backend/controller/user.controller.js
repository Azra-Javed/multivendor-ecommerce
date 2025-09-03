const path = require("path");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");

//activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//@desc: create new user
//@route: POST /api/user/v2/create-user

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

//@desc: activate user
//@route: POST /api/user/v2/activation
const activateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    const { name, email, password, avatar } = newUser;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    user = await User.create({
      name,
      email,
      avatar,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: login user
//@route: POST /api/user/v2/login-user
const userLogin = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: getUser
//@route: GET /api/user/v2/getuser

const getUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: logout user
//@route: Delete /api/user/v2/logout
const logoutUser = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("token", null, {
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

//@desc: update user
//@route: PUT /api/user/v2/update-user-info
const updateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password, phoneNumber, name } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    (user.name = name),
      (user.email = email),
      (user.phoneNumber = phoneNumber),
      await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: update user avatar
//@route: PUT /api/user/v2/update-avatar

const updateAvatar = catchAsyncErrors(async (req, res, next) => {
  const existUser = await User.findById(req.user.id);

  if (existUser.avatar) {
    const existsAvatarPath = path.join(
      __dirname,
      "..",
      "uploads",
      existUser.avatar
    );

    if (fs.existsSync(existsAvatarPath)) {
      fs.unlinkSync(existsAvatarPath);
    }
  }

  const fileUrl = req.file.filename;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar: fileUrl },
    { new: true }
  );

  res.status(200).json({
    success: true,
    user,
  });

  try {
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: update user addresses
//@route: PUT /api/user/v2/update-user-addresses

const upddateAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === req.body.addressType
    );

    if (sameTypeAddress) {
      return next(
        new ErrorHandler(`${req.body.addressType} address already exists`)
      );
    }

    const exitsAddress = user.addresses.find(
      (address) => address._id === req.body._id
    );

    // update existing address
    if (exitsAddress) {
      Object.assign(exitsAddress, req.body);
    } else {
      // add new address to the array
      user.addresses.push(req.body);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User Address updated successfully",
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: delete user address
//@route: PUT /api/user/v2/delete-user-address/:Id

const deleteUserAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    await User.updateOne(
      {
        _id: userId, // find user
      },
      { $pull: { addresses: { _id: addressId } } } // delete address
    );

    const user = await User.findById(userId);

    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully!", user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: update password
//@route: PUT /api/user/v2/update-user-password

const updatePassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old Password is incorrect!", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        new ErrorHandler("Password and confirm password do not match", 400)
      );
    }

    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500)());
  }
});

//@desc: find userInfo by userid
//@route: PUT /api/user/v2/update-user-password
const getUserInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createUser,
  userLogin,
  getUser,
  activateUser,
  logoutUser,
  updateUser,
  updateAvatar,
  upddateAddress,
  deleteUserAddress,
  updatePassword,
  getUserInfo,
};
