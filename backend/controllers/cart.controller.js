import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
  try {
    // extract only productIds
    const productIds = req.user.cartItems.map((item) => item.productId);

    // find all products in the cart
    const products = await Product.find({ _id: { $in: productIds } });

    // attach quantity to each product
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.productId.toString() === product._id.toString()
      );
      return {
        ...product.toJSON(),
        quantity: item.quantity,
      };
    });

    res.json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(
      (item) => item.productId.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ productId, quantity: 1 });
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.body;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }
    user.cartItems = [];

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in removeAllFromCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(
          (item) => item.productId.toString() !== productId.toString()
        );
        await user.save();
        return res.json(user.cartItems);
      }
      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
