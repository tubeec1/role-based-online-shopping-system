import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLatestProducts } from "../../../features/products/productSlice";

const HomeNewArrivals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { latestProducts, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getLatestProducts());
  }, [dispatch]);

  const imageUrl = (image) => {
    return `http://localhost/online-shopping-system/backend/public/${image}`;
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
          <div>
            <p className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-2">
              New Collection
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-blue-950">
              New Arrivals
            </h2>

            <p className="mt-3 text-gray-500 max-w-xl">
              Be the first to get your hands on the latest products added to our
              store.
            </p>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-blue-950 border-b-2 border-transparent hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
          >
            View All →
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading latest products...</p>
          </div>
        )}

        {/* Products */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {latestProducts?.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product-details/${product.id}`)}
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-64 bg-gray-50">
                  <img
                    src={imageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* NEW Badge */}
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow">
                    NEW
                  </span>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product-details/${product.id}`);
                      }}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                    >
                      View Product
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-gray-400 uppercase">
                    {product.category_name}
                  </p>

                  <h3 className="text-sm font-semibold text-blue-950 mt-1 line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-blue-950">
                      ${Number(product.price).toFixed(2)}
                    </span>

                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {product.stock} Stock
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && latestProducts?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No latest products available.</p>
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-12 text-center sm:hidden">
          <button
            onClick={() => navigate("/products")}
            className="text-sm font-semibold text-blue-950 hover:text-orange-500 transition"
          >
            View All →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeNewArrivals;
