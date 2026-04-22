import React from "react";

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    oldPrice: 179.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    rating: 4.5,
    discount: 20,
  },
  {
    id: 2,
    name: "Minimalist Leather Backpack",
    category: "Fashion",
    price: 89.0,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    rating: 5.0,
    discount: null,
  },
  {
    id: 3,
    name: "Smart Fitness Watch Pro",
    category: "Electronics",
    price: 249.99,
    oldPrice: 299.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    rating: 4.0,
    discount: 15,
  },
  {
    id: 4,
    name: "Handcrafted Ceramic Mug Set",
    category: "Home & Garden",
    price: 34.5,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600&auto=format&fit=crop",
    rating: 4.8,
    discount: null,
  },
];

let HomeFeaturedProducts = () => {
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
              Explore our handpicked selection of premium products.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>

                {/* Discount */}
                {product.discount && (
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow">
                    -{product.discount}%
                  </span>
                )}

                {/* Wishlist */}
                <button className="absolute top-3 right-3 bg-white/80 backdrop-blur p-2 rounded-full hover:text-orange-500 transition">
                  ❤️
                </button>

                {/* Hover Buttons */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-300">
                  <button className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 shadow-md">
                    Add to Cart
                  </button>
                  <button className="px-4 py-2 bg-white text-gray-800 text-sm rounded-lg hover:bg-gray-100 shadow">
                    View
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-xs text-gray-400 uppercase">
                  {product.category}
                </p>

                <h3 className="text-sm font-semibold text-gray-900 mt-1 truncate">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  {"★★★★★".split("").map((star, i) => (
                    <span
                      key={i}
                      className={
                        i < Math.floor(product.rating)
                          ? "text-orange-400 text-sm"
                          : "text-gray-200 text-sm"
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.rating})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturedProducts;
