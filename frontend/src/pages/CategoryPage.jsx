import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";


const CategoryPage = () => {
   const { getProductByCategory, product } = useProductStore();
 
  const { category } = useParams();
  useEffect(() => {
    if (category) {
      getProductByCategory(category);
    }
  }, [category, getProductByCategory,category]);
  console.log(product);
  return (
   <div className='min-h-screen'>
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.h1
					className='text-center text-4xl mt-8 sm:text-5xl font-bold text-blue-800 mb-8'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</motion.h1>

				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{product?.length === 0 && (
           <div className="flex items-center justify-center w-full col-span-full min-h-[50vh]">
            <h2 className="text-3xl text-gray-400 font-medium">No products found</h2>
           </div>
						
					)}

					{product?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default CategoryPage;
