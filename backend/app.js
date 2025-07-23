const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./routes/user.routes");
const shop = require("./routes/shop.routes");

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

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

app.get("/test", (req, res) => {
  res.send("Server is working");
});

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);

// error handling
app.use(ErrorHandler);

module.exports = app;
