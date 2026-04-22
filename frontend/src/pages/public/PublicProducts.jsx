import React, { useState, useMemo } from "react";
import { FiShoppingCart, FiSearch } from "react-icons/fi";

const mockProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description:
      "Noise-cancelling over-ear headphones with 30-hour battery life.",
    price: 129.99,
    oldPrice: 179.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Minimalist Leather Backpack",
    description: "Water-resistant backpack with padded laptop compartment.",
    price: 89.0,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    category: "Fashion",
  },
  {
    id: 3,
    name: "Smart Fitness Watch Pro",
    description:
      "Track your health, heart rate, and daily workouts seamlessly.",
    price: 249.99,
    oldPrice: 299.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    category: "Electronics",
  },
];

let PublicProducts = () => {
  const [products] = useState(mockProducts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔥 Derived data (optimized)
  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  // 🔥 Ready for real cart logic
  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
    // later:
    // addToCart(product)
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-950">
            Our Products
          </h1>
          <p className="mt-3 text-gray-500 text-lg">
            Discover high-quality products curated just for you
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="bg-white p-5 rounded-2xl border mb-10 flex flex-col lg:flex-row gap-5 items-center justify-between">
          {/* SEARCH */}
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

          {/* CATEGORY */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const discount =
                product.oldPrice &&
                Math.round((1 - product.price / product.oldPrice) * 100);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border overflow-hidden group hover:shadow-xl transition"
                >
                  {/* IMAGE */}
                  <div className="relative h-60 overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />

                    {discount && (
                      <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 flex flex-col h-full">
                    <p className="text-xs text-gray-400 uppercase mb-1">
                      {product.category}
                    </p>

                    <h3 className="font-bold text-blue-950 line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>

                    {/* PRICE */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-lg font-extrabold text-orange-500">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* BUTTON */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-auto w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <FiShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border">
            <FiSearch className="mx-auto text-gray-300 w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-blue-950">
              No products found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filters
            </p>

            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-5 px-6 py-2 bg-blue-950 text-white rounded-lg"
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
