import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";
import CartItem from "../components/CartItem";
import { useCartStore } from "../store/useCartStore";

const CartPage = () => {
  const {
    cart,
    getCartItems,
    subtotal,
    total,
    discount,
    coupon,
    setCoupon,
    appliedCoupon,
    setAppliedCoupon,
    couponError,
    handleApplyCoupon,
    handleQuantityChange,
  } = useCartStore();

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  return (
    <div className="min-h-screen mt-16 bg-gray-50 py-10 px-2 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
          

          {cart?.length === 0 ? (
            <EmptyCartUI />
          ) : (
            <div>
              {cart.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onQuantityChange={(newQty) =>
                    handleQuantityChange(item._id, newQty)
                  }
                />
              ))}
            </div>
          )}
        </div>
        {/* Billing Summary Section */}
        <div className="w-full md:w-1/3 max-w-md">
          <div className="bg-white rounded-lg shadow p-6 sticky top-8">
            <h3 className="text-xl font-bold mb-4">Billing Summary</h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Subtotal</span>
              <span>&#8377;{" "} {(subtotal || 0).toFixed(2)}</span>
            </div>
            <div className="mb-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleApplyCoupon();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={coupon || ""}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border rounded px-2 py-2"
                  disabled={!!appliedCoupon}
                />
                <button
                  type="submit"
                  className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition ${
                    appliedCoupon ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!!appliedCoupon}
                >
                  Apply
                </button>
              </form>
              {couponError && (
                <div className="text-red-500 text-sm mt-1">{couponError}</div>
              )}
              {appliedCoupon && (
                <div className="text-green-600 text-sm mt-1">
                  Coupon <span className="font-semibold">{appliedCoupon}</span>{" "}
                  applied!
                </div>
              )}
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Coupon Discount</span>
              <span className="text-green-600">
                  &#8377;{" "}{(discount || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center border-t pt-4 mt-4">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">
                &#8377;{" "} {(total || 0).toFixed(2)}
              </span>
            </div>
            <button
              className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded transition duration-200"
              disabled={cart?.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-4 py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="h-24 w-24 text-gray-300" />
    <h3 className="text-2xl font-semibold ">Your cart is empty</h3>
    <p className="text-gray-400">
      Looks like you {"haven't"} added anything to your cart yet.
    </p>
    <Link
      className="mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600"
      to="/"
    >
      Start Shopping
    </Link>
  </motion.div>
);
