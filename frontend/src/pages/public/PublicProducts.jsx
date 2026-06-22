import React, { useEffect, useMemo, useState } from "react";
import { FiShoppingCart, FiSearch, FiEye, FiPackage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products/productSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const PublicProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading } = useSelector((state) => state.products);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        products.map((product) => product.category?.name).filter(Boolean),
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category?.name === activeCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const imageUrl = (image) => {
    return `http://localhost/online-shopping-system/backend/public/${image}`;
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold uppercase tracking-widest">
            Shop Collection
          </p>

          <h1 className="text-4xl font-extrabold text-blue-950 mt-2">
            Our Products
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Discover high-quality products curated just for you
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl p-5 border mb-10 flex flex-col lg:flex-row gap-5 justify-between items-center">
          <div className="relative w-full lg:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">
            <p className="text-gray-500">Loading products...</p>
          </div>
        )}

        {/* Products */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div
                  className="relative h-64 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product-details/${product.id}`)}
                >
                  <img
                    src={imageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {product.category?.name}
                  </span>

                  <span className="absolute top-3 right-3 bg-white shadow text-xs px-3 py-1 rounded-full font-medium">
                    Stock: {product.stock}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    onClick={() => navigate(`/product-details/${product.id}`)}
                    className="font-bold text-blue-950 text-lg cursor-pointer hover:text-orange-500 transition"
                  >
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-orange-500">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <button
                      onClick={() => navigate(`/product-details/${product.id}`)}
                      className="flex items-center justify-center gap-2 py-3 border rounded-xl hover:bg-gray-100 transition"
                    >
                      <FiEye />
                      View
                    </button>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition"
                    >
                      <FiShoppingCart />
                      Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filteredProducts.length === 0 && (
          <div className="bg-white rounded-2xl border py-20 text-center">
            <FiPackage className="mx-auto text-gray-300 text-5xl mb-4" />

            <h3 className="text-2xl font-bold text-blue-950">
              No products found
            </h3>

            <p className="text-gray-500 mt-2">
              Try changing your search or category filter.
            </p>

            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-5 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProducts;
