const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./routes/user.routes");
const shop = require("./routes/shop.routes");
const product = require("./routes/product.routes");
const event = require("./routes/event.routes");
const coupon = require("./routes/couponCode.routes");
const payment = require("./routes/payment.routes");
const order = require("./routes/order.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);

// error handling
app.use(ErrorHandler);

module.exports = app;
