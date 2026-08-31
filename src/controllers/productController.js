import pool from "../config/db.js";


export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id ASC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      message: "Failed to get products",
    });
  }
};


// ========================================
// GET ONE PRODUCT
// GET /api/products/:id
// ========================================

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT id, name FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error("Get product error:", error);

    res.status(500).json({
      message: "Failed to get product",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
    } = req.body || {};

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Product name is required",
      });
    }

    if (price === undefined || price < 0) {
      return res.status(400).json({
        message: "Price cannot be negative",
      });
    }

    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({
        message: "Quantity cannot be negative",
      });
    }

    const result = await pool.query(
      `INSERT INTO products
      (
        name,
        description,
        price,
        quantity,
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING *`,
      [
        name,
        description,
        price,
        quantity,
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      quantity,
    } = req.body || {};

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Product name is required",
      });
    }

    if (price < 0) {
      return res.status(400).json({
        message: "Price cannot be negative",
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        message: "Quantity cannot be negative",
      });
    }

    const result = await pool.query(
      `UPDATE products
       SET
         name = $1,
         description = $2,
         price = $3,
         quantity = $4,
         updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [
        name,
        description,
        price,
        quantity,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body || {};

    if (quantity === undefined) {
      return res.status(400).json({
        message: "Quantity is required",
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        message: "Quantity cannot be negative",
      });
    }

    const result = await pool.query(
      `UPDATE products
       SET
         quantity = $1,
         updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [quantity, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error("Update quantity error:", error);

    res.status(500).json({
      message: "Failed to update quantity",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM products
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: result.rows[0],
    });

  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};