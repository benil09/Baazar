import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  product: [],
  loading: false,
  setProducts: (product) => set({ product }),

  createProduct: async (productData) => {
    set({ loading: true });

    try {
      const res = await axios.post("/product", productData);

      set((prevState) => ({
        product: [...prevState.product, res.data],
        loading: false,
      }));

      toast.success("Product created successfully");
    } catch (error) {
      console.log("Error in creating product", error);

      set({ loading: false });
      toast.error("Not created");
    }
  },
  getAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/product");
      set({ product: res.data.product, loading: false });
    } catch (error) {
      console.log("Error in fetching Product");
      set({ error: "Failed to load products", loading: false });
      toast.error("Error while fetching products");
    }
  },
  getProductByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/product/category/${category}`);

      set({ product: res.data.products, loading: false });
    } catch (error) {
      console.log("Error in fetching products by category", error);
      set({ error: "Failed to load products by category", loading: false });
      toast.error("Error while fetching products by category");
    }
  },
  deleteProduct: async (id) => {
    console.log(id);

    set({ loading: true });
    try {
      await axios.delete(`/product/${id}`);

      set((prevState) => ({
        product: prevState.product.filter((item) => item._id !== id),
        loading: false,
      }));

      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("Error in deleting product", error);
      set({ loading: false });
      toast.error("Failed to delete product");
    }
  },
  toggleFeaturedProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/product/${id}`);
      set((prevState) => ({
        product: prevState.product.map((item) =>
          item._id === id ? { ...item, isFeatured: res.data.isFeatured } : item
        ),
        loading: false,
      }));
      toast.success("Product feature toggled successfully");
    } catch (error) {
      console.log("Error in toggling featured product", error);
      set({ loading: false });
      toast.error("Failed to toggle featured product");
    }
  },
}));
