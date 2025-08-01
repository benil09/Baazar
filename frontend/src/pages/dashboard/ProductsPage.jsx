import { Star, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useProductStore } from "../../store/useProductStore";

const ProductsPage = () => {
  const {
    getAllProducts,
    product,
    loading,
    deleteProduct,
    toggleFeaturedProduct,
  } = useProductStore();

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">All Products</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : product.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="overflow-x-auto max-w-6xl mx-auto">
          <table className="min-w-full divide-y divide-gray-200 border rounded-xl overflow-hidden bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {product.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">
                    ₹ {item.price}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center justify-start gap-4 h-full">
                      <button
                        className={`text-black-500 cursor-pointer hover:text-yellow-600 transition ${
                          item.isFeatured ? "bg-amber-400 rounded-full p-2" : ""}`}
                        onClick={() => toggleFeaturedProduct(item._id)}
                      >
                        <Star className={`w-5 h-5`} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600 transition"
                        onClick={() => deleteProduct(item._id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
