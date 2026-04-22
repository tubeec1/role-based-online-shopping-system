import React from "react";

const products = [
  {
    id: 1,
    name: "Minimalist Analog Watch",
    category: "Accessories",
    price: 199.0,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Oversized Wool Sweater",
    category: "Fashion",
    price: 85.0,
    oldPrice: 110.0,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Wireless Noise Cancelling Earbuds",
    category: "Electronics",
    price: 149.99,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Elegant Glass Table Lamp",
    category: "Home & Garden",
    price: 65.0,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?q=80&w=600&auto=format&fit=crop",
    rating: 4.3,
  },
  {
    id: 5,
    name: "Leather Crossbody Bag",
    category: "Fashion",
    price: 125.0,
    oldPrice: 160.0,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop",
    rating: 4.7,
  },
  {
    id: 6,
    name: "Titanium Water Bottle",
    category: "Sports",
    price: 45.0,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
    rating: 4.4,
  },
  {
    id: 7,
    name: "Scented Soy Candle Set",
    category: "Home & Garden",
    price: 32.5,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?q=80&w=600&auto=format&fit=crop",
    rating: 4.6,
  },
  {
    id: 8,
    name: "Ultra-Slim Power Bank",
    category: "Electronics",
    price: 55.0,
    oldPrice: 70.0,
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=600&auto=format&fit=crop",
    rating: 4.2,
  },
];

let HomeNewArrivals = () => {
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

          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-blue-950 border-b-2 border-transparent hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
          >
            View All →
          </a>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-64 bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* NEW Badge */}
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow">
                  NEW
                </span>

                {/* Wishlist */}
                <button className="absolute top-3 right-3 bg-white/80 backdrop-blur p-2 rounded-full text-gray-600 hover:text-orange-500 transition">
                  ♥
                </button>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition transform translate-y-4 group-hover:translate-y-0">
                    Add to Cart
                  </button>
                  <button className="px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition transform translate-y-4 group-hover:translate-y-0 delay-75">
                    View
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-gray-400 uppercase">
                  {product.category}
                </p>

                <h3 className="text-sm font-semibold text-blue-950 mt-1 line-clamp-1">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                  ⭐ {product.rating}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-lg font-bold text-blue-950">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-12 text-center sm:hidden">
          <a className="text-sm font-semibold text-blue-950 hover:text-orange-500 transition">
            View All →
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeNewArrivals;
