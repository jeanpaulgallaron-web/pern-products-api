import express from "express";
import cors from "cors";
import "dotenv/config";

import healthRoutes from "./routes/healthRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import pool from "./config/db.js";

const app = express();

const PORT = process.env.PORT || 5001;


// MIDDLEWARE

app.use(cors());

app.use(express.json());


// HOME

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Products API is running",
  });
});


// ROUTES

app.use("/api/health", healthRoutes);

app.use("/api/products", productRoutes);


// DATABASE TEST

pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("✅ Database connection successful");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:");
    console.error(error.message);
  });


// START SERVER

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});