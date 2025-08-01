import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage"; // Your actual logged-in home page
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useUserStore } from "./store/useUserStore";
import CartPage from "./pages/CartPage";
import FavouritePage from "./pages/FavouritePage";
import Profile from "./pages/Profile";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(checkingAuth) return <div className="flex justify-center items-center h-screen">loading ... </div>

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/cart" element={!user ? <LoginPage /> : <CartPage/>} />
        <Route path="/favourite" element={!user ? <LoginPage /> : <FavouritePage/>} />
        <Route path="/user" element={!user ? <LoginPage /> :<Profile/> } />
        <Route path="/secret-dashboard" element={user?.role === 'admin' ? <AdminPage /> :<Navigate to="/login" />} />
        <Route path="/category/:category" element={<CategoryPage />} />

      </Routes>
      <Toaster />
    </>
  );
}

export default App;
