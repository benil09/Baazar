import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import FavouritePage from "./pages/FavouritePage";
import HomePage from "./pages/HomePage"; // Your actual logged-in home page
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import SignupPage from "./pages/SignupPage";
import { useCartStore } from "./store/useCartStore";
import { useUserStore } from "./store/useUserStore";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    getCartItems()
  },[getCartItems]);

  if (checkingAuth)
    return (
      <div className="flex justify-center items-center h-screen">
        loading ...{" "}
      </div>
    );

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/cart" element={!user ? <LoginPage /> : <CartPage />} />
        <Route
          path="/favourite"
          element={!user ? <LoginPage /> : <FavouritePage />}
        />
        <Route path="/user" element={!user ? <LoginPage /> : <Profile />} />
        <Route
          path="/secret-dashboard"
          element={
            user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
          }
        />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
