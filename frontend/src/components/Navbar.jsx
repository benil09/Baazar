import { CircleUser, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import {useCartStore} from "../store/useCartStore"


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const {cart} = useCartStore()


  const { user, logout } = useUserStore();
  const isAdmin = user?.role === 'admin';

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Baazar.com
            </Link>
          </div>
          <div className="hidden md:flex flex-1 justify-end items-center px-4">
            <input
              type="text"
              placeholder="Search for Products"
              className="w-full max-w-xs px-6 py-2  rounded-full border border-gray-300 focus:outline-none  focus:bg-gray-100 transition duration-200 bg-white text-gray-800"
            />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="text-gray-700 hover:text-blue-600">
              <div className="relative">
                <ShoppingCart />
                {cart.length>0 &&  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition duration-300 ease-in-out">
                {cart.length}
                </span>}
                
              </div>
            </Link>
            <Link to="/favourite" className="text-gray-700 hover:text-blue-600 ">
              <Heart  />
            </Link>
            <Link to="/user" className="text-gray-700 hover:text-blue-600">
              <CircleUser />
            </Link>
            {user ? (
              <Link
                onClick={logout}
                to="/login"
                className="text-gray-700 hover:text-blue-600 border-none px-6 py-2 bg-blue-200 rounded-md"
              >
                Logout
              </Link>
            ) : (
              <div className="flex">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 border-none px-6 py-2 bg-blue-200 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="mx-2 text-gray-700 hover:text-blue-600 border-none px-6 py-2 bg-blue-200 rounded-md"
                >
                  Signup
                </Link>
              </div>
            )}
            {isAdmin?( <Link to={"/secret-dashboard"} className="text-gray-700 hover:text-blue-600 border-none px-6 py-2 bg-blue-200 rounded-md" >dashboard</Link> ) :(" ") }
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link
              to="/shop"
              className="block text-gray-700 hover:text-blue-600"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-blue-600"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-blue-600"
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="block text-gray-700 hover:text-blue-600"
            >
              Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
