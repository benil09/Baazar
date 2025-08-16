import { toast } from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";

export const useCartStore = create((set, get) => ({
  cart: [],

  loading: false,
  coupon: null,
  total: 0,
  subtotal: 0,

  getCartItems: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  addToCart: async (product) => {
    set({ loading: true });
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart");
      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];

        return { cart: newCart, loading: false };
      });
      console.log("Updated cart:", get().cart);
      get().calculateTotals();
    } catch (error) {
      console.log("Error in adding product to cart", error);
      set({ loading: false });
      toast.error("Failed to add product to cart");
    }
  },
  removeFromCart: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/cart/`, { data: { productId } });
      toast.success("Product removed from cart");
      set((prevState) => {
        const newCart = prevState.cart.filter((item) => item._id !== productId);
        return { cart: newCart, loading: false };
      });
      get().calculateTotals();
    } catch (error) {
      console.log("Error in removing product from cart", error);
      set({ loading: false });
      toast.error("Failed to remove product from cart");
    }
  },
  updateQuantity: async (productId, quantity) => {
    set({ loading: true });
    try {
      if (quantity == 0) {
        get().removeFromCart(productId);
        return;
      }

      await axios.put(`/cart/${productId}`, { quantity });

      set((prevState) => {
        const newCart = prevState.cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        );

        return { cart: newCart, loading: false };
      });
      get().calculateTotals();
    } catch (error) {
      console.log("Error in updating product quantity", error);
      set({ loading: false });
      toast.error("Failed to update product quantity");
    }
  },
  calculateTotals: () => {
    const { cart = [], coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let total = subtotal;

    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }
    set({ subtotal, total });
  },
}));
