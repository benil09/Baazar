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
            {user ? (
              <>
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
                <Link
                  onClick={logout}
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 border-none px-6 py-2 bg-blue-200 rounded-md"
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 border-none px-6 py-2 bg-blue-200 rounded-md"
              >
                Login
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="text-gray-700 hover:text-blue-600 border-none px-6 py-2 bg-blue-200 rounded-md"
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            
            {user ? (
              <div className="flex space-x-4 ml-4">
                <Link to="/cart" className="text-gray-700 hover:text-blue-600">
                  <div className="relative">
                    <ShoppingCart />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition duration-300 ease-in-out">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </Link>
                <Link to="/favourite" className="text-gray-700 hover:text-blue-600">
                  <Heart />
                </Link>
                <Link to="/user" className="text-gray-700 hover:text-blue-600">
                  <CircleUser />
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 border-none px-4 py-2 bg-blue-200 rounded-md ml-4"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
     
    </nav>
  );
};

export default Navbar;
