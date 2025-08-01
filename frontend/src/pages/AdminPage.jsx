import { motion } from "framer-motion";
import { useState } from "react";
import { tabs } from "../constants/tabs";
import CreatePage from "./dashboard/CreatePage";
import ProductsPage from "./dashboard/ProductsPage";
import AnalyticsPage from "./dashboard/AnalyticsPage";
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";

const AdminPage = () => {
 
  const [activeTab, setActiveTab] = useState("create");
  const {getAllProducts} = useProductStore()
  useEffect(()=>{
    getAllProducts()
  },[getAllProducts])



  return (
    <div className="min-h-screen mt-16 bg-gray-100 p-4">
      <header className="rounded-md p-4 flex justify-center items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl mx-6 font-bold text-gray-800"
        >
          Admin Dashboard
        </motion.h1>
      </header>
      <div className="p-2 flex flex-wrap justify-center gap-2 w-full mt-4">
        {tabs.map((tab) => (
          <button
            onClick={() => setActiveTab(tab.id)}
            key={tab.id}
            title={tab.label}
            aria-pressed={activeTab === tab.id}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-md font-medium transition-colors duration-300 ${
              activeTab === tab.id
                ? "bg-blue-800 text-white"
                : "bg-blue-200 text-gray-800 hover:bg-blue-300"
            }`}
          >
            <tab.icon className="h-5 w-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-6">
        {activeTab === "create" && <CreatePage />}
        {activeTab === "products" && <ProductsPage />}
        {activeTab === "analytics" && <AnalyticsPage />}
      </div>

      {/* <div className="flex flex-col md:flex-row mt-6 gap-4">
        <aside className="w-full md:w-1/3 lg:w-1/4 bg-white rounded shadow p-4">
          <nav>
            <ul className="space-y-2">
              {["Dashboard", "Users", "Orders", "Products", "Settings"].map(
                (item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all font-medium"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 bg-white rounded shadow p-4 md:p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Welcome {user.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-100 p-4 rounded shadow">
              <h3 className="font-bold text-green-700">Total Users</h3>
              <p className="text-2xl">120</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded shadow">
              <h3 className="font-bold text-yellow-700">Total Orders</h3>
              <p className="text-2xl">75</p>
            </div>
            <div className="bg-blue-100 p-4 rounded shadow">
              <h3 className="font-bold text-blue-700">Products Listed</h3>
              <p className="text-2xl">40</p>
            </div>
            <div className="bg-red-100 p-4 rounded shadow">
              <h3 className="font-bold text-red-700">Pending Requests</h3>
              <p className="text-2xl">10</p>
            </div>
          </div>
        </main>
      </div> */}
    </div>
  );
};

export default AdminPage;
