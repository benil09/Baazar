import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "react-hot-toast";
import {useUserStore} from "../store/useUserStore"
import { useCartStore } from "../store/useCartStore";
const ProductCard = ({ product }) => {
  const {user} = useUserStore();
  const {addToCart} = useCartStore();
  const handleAddToCart = ()=>{
    if(!user){
      toast.error("Please login to add to cart");
    }else{
      // call a function to add product to cart 
      addToCart(product)
    }
  }


  return (
   

    <motion.div className="group w-full sm:max-w-sm rounded-xl shadow-md overflow-hidden border border-gray-300 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 sm:h-54 object-cover rounded-t-xl"
        />
        <button className="absolute top-2 p-2 bg-white rounded-full right-2 opacity-0 group-hover:opacity-100 transition duration-300">
          <Heart className="w-5 h-5 hover:text-red-600 text-gray-400" />
        </button>
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mt-1 line-clamp-2 opacity-60 text-xs sm:text-sm">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base sm:text-lg font-bold text-green-600">
            ₹{product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="p-2 cursor-pointer rounded-full hover:bg-pink-100 transition duration-200"
          >
            <ShoppingCart className="w-5 h-5 text-pink-700" />
          </button>
        </div>
      </div>
    </motion.div>
    
  );
};

export default ProductCard;
