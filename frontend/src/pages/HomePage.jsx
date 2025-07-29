import { category } from "../constants/category";
import { useUserStore } from "../store/useUserStore";
import CategoryItem from "../components/CategoryItem";

const HomePage = () => {
  const { user } = useUserStore();
  return (
    <div className="p-8 mt-14">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          {user?.name ? (
            <>
              Welcome <span className="text-red-400">{user.name}</span> to{" "}
              <span className="text-blue-600">Baazar.com</span>
            </>
          ) : (
            <>
              Welcome to <span className="text-blue-600">Baazar.com</span>
            </>
          )}
        </h1>
        <p className="text-gray-600 mt-2">
          Discover the best products at unbeatable prices.
        </p>
      </header>

      <div className="flex justify-center sm:justify-start " >
        <h1 className="font-extrabold text-blue-700 text-3xl">Explore Categories</h1>
      </div>
     <CategoryItem/>
    </div>
  );
};

export default HomePage;
