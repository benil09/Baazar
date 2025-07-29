import {create } from "zustand"
import toast from "react-hot-toast"
import axios from "../lib/axios"

export const useProductStore = create((set)=>({
    product:[],
    loading:false,
    setProducts:(product)=>set({product}),

    createProduct: async (productData)=>{
        set({loading:true})

        try {
            const res = await axios.post("/product",productData)
            
            set((prevState)=>({
                product:[...prevState.product,res.data],
                loading:false
            }))
            
            toast.success("Product created successfully");
            
        } catch (error) {
            console.log("Error in creating product" , error);
            
            set({loading:false})
            toast.error("Not created");
            
        }
    }
}))