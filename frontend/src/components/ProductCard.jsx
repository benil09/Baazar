import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-hot-toast";
import {useUserStore} from "../store/useUserStore"
const ProductCard = ({ product }) => {
  const {user} = useUserStore();
  const handleAddToCart = ()=>{
    if(!user){
      toast.error("Please login to add to cart");
    }else{
      // call a function to add product to cart 
      toast.success("handle cart called")
    }
  }


  return (
   

    <motion.div className="max-w-sm w-full rounded-xl shadow-md overflow-hidden border border-gray-300 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-54 object-cover rounded-t-xl"
      />
      <div className="p-4 bg-white border-t border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mt-1 line-clamp-2 opacity-60  text-sm">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">
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
