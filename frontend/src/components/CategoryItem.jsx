import { category } from "../constants/category";

const CategoryItem = () => {
  return (
    <div>
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-12">

        {category.map((cat) => (
          <a
            key={cat.name}
            href={"/category" + cat.href}
            className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-lg font-semibold">{cat.name}</h2>
            </div>
          </a>
        ))}

        
      </div>
    </div>
  )
}

export default CategoryItem
