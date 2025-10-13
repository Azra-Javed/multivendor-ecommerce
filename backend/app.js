const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
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
const conversation = require("./routes/conversation.routes");
const message = require("./routes/message.routes");
const withdraw = require("./routes/withdraw.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://shop-trendora.vercel.app",
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "./uploads")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

app.use("/test", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/withdraw", withdraw);

// error handling
app.use(ErrorHandler);

module.exports = app;
