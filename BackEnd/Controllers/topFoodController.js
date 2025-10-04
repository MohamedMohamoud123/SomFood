import Order from "../models/orderModel.js";

export const getTopOrderedFoods = async (req, res) => {
  try {
    const topFoods = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items._id",
          totalOrders: { $sum: "$items.quantity" },
          foodName: { $first: "$items.name" },
          image: { $first: "$items.image" },
          price: { $first: "$items.price" }
        }
      },
      { $sort: { totalOrders: -1 } },
      { $limit: 10 }
    ]);
    res.status(200).json(topFoods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching top foods", error });
  }
};
