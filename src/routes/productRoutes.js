import express from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateQuantity,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.patch("/:id/quantity", updateQuantity);
router.delete("/:id", deleteProduct);

export default router;