// controllers/cartController.js

import userModel from "../models/userModel.js";

// Add item to cart (atomic $inc on the nested field)
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    await userModel.findByIdAndUpdate(
      userId,
      { $inc: { [`cartData.${itemId}`]: 1 } },
      { new: true, upsert: true }
    );

    return res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

// Remove item from cart (atomic decrement or unset)
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    // Fetch current count for this item
    const userData = await userModel.findById(userId).select("cartData");
    const currentCount = (userData.cartData || {})[itemId] || 0;

    if (currentCount > 1) {
      // Just decrement by 1
      await userModel.findByIdAndUpdate(
        userId,
        { $inc: { [`cartData.${itemId}`]: -1 } },
        { new: true }
      );
    } else {
      // Remove the field entirely when count would go to 0
      await userModel.findByIdAndUpdate(
        userId,
        { $unset: { [`cartData.${itemId}`]: "" } },
        { new: true }
      );
    }

    return res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    return res.status(500).json({ success: false, message: "Error removing from cart" });
  }
};

// Fetch the entire cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId).select("cartData");

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    return res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error in getCart:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
