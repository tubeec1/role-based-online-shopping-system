import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../../features/products/productSlice";

const HomeFeaturedProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
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
              Featured
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Featured Products
            </h2>

            <p className="mt-3 text-gray-500 max-w-xl">
              Explore our latest products available in our store.
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading products...</p>
          </div>
        )}

        {/* Products */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product-details/${product.id}`)}
                className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={imageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>

                  {/* Stock Badge */}
                  {product.stock <= 10 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow">
                      Low Stock
                    </span>
                  )}

                  {/* Hover Buttons */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product-details/${product.id}`);
                      }}
                      className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 shadow-md"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <p className="text-xs text-gray-400 uppercase">
                    {product.category?.name}
                  </p>

                  <h3 className="text-sm font-semibold text-gray-900 mt-1 truncate">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} Left`
                        : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products?.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeFeaturedProducts;
