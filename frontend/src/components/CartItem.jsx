import { useCartStore } from "../store/useCartStore";
import {Trash,Plus,Minus} from 'lucide-react'

const CartItem = ({item}) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div
      key={item.id}
      className="flex flex-col sm:flex-row w-full border-b border-gray-300 last:border-b-0 py-4 bg-white hover:bg-gray-50"
    >
      <div className="flex flex-row w-full space-y-2 sm:space-y-0 gap-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
        />
        <div className="flex flex-col flex-1 justify-center">
          <div className="font-medium">{item.name}</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center space-x-2">
              <label className="text-gray-600 text-sm">Qty:</label>
              <div className="flex items-center border  rounded overflow-hidden text-sm">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus />
                </button>
                <div className="px-1 py-0.5 bg-white text-center w-8 text-sm">{item.quantity}</div>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="text-sm" />
                </button>
              </div>
            </div>
            <button
              className="text-red-400 hover:text-red-600 transition-colors p-2 rounded"
              onClick={() => removeFromCart(item._id)}
              aria-label="Remove from cart"
              style={{ lineHeight: 0 }}
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3 text-right sm:mt-0 sm:text-right sm:w-24 font-semibold text-lg">
        {(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
