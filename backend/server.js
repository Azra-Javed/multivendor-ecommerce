// 1. Load environment variables first
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/.env" });
}

// 2. Import packages
const app = require("./app");
const connectDatabase = require("./db/Database");
const cloudinary = require("cloudinary").v2;

// 3. Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 4. Connect database
connectDatabase();

// 5. Start server
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

// 6. Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

// 7. Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Promise Rejection: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
