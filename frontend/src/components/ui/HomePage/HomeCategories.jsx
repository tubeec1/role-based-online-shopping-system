import React from "react";

const categories = [
  {
    id: 1,
    name: "Electronics",
    count: 120,
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Fashion",
    count: 350,
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Home & Garden",
    count: 85,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Sports",
    count: 210,
    image:
      "https://images.unsplash.com/photo-1461896836934-bd45ba7b5e97?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Beauty",
    count: 95,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Books",
    count: 420,
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
  },
];

let HomeCategories = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest text-orange-500 uppercase mb-3">
            Categories
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Shop by Category
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Explore our wide range of products across top categories designed
            for you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="h-48 sm:h-52 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-semibold group-hover:text-orange-400 transition">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-200">
                  {category.count} Products
                </p>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-orange-500/60 rounded-2xl transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-14 text-center">
          <button className="px-8 py-3.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-orange-500/30">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
