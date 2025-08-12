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
      set({ cart: res.data.cartItems, loading: false });
      get().calculateTotals();
    } catch (error) {
      console.log("Error in fetching cart items", error);
      set({ loading: false });
      toast.error("Failed to load cart items");
    }
  },

  addToCart: async (product) => {
    set({ loading: true });
    try {
      const res = await axios.post("/cart", { productId: product._id });
      console.log(res);
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
      get().calculateTotals();
    } catch (error) {
      console.log("Error in adding product to cart", error);
      set({ loading: false });
      toast.error("Failed to add product to cart");
    }
  },
  calculateTotals: () => {
    const { cart, coupon } = get();
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
