import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../features/category/categorySlice";

const HomeCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading, error } = useSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const getImageUrl = (image) => {
    if (!image) {
      return "https://via.placeholder.com/600x400";
    }

    return `http://localhost/online-shopping-system/backend/public/${image}`;
  };

  if (loading) {
    return <div className="py-20 text-center">Loading Categories...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-orange-500 uppercase text-sm font-semibold">
            Categories
          </span>

          <h2 className="text-4xl font-bold mt-2">Shop by Category</h2>

          <p className="text-gray-500 mt-4">
            Explore our wide range of products.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(`/category-details/${category.name}`)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow"
            >
              <div className="h-52">
                <img
                  src={getImageUrl(category.image)}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{category.name}</h3>

                <p className="text-sm">Browse Products</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
