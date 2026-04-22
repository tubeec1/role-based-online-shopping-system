import React from "react";

let HomeHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-orange-50 min-h-screen flex items-center py-10 lg:py-20">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl"></div>

      {/* Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* LEFT CONTENT */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-500 text-sm font-semibold tracking-wide mb-6">
              New Collection 2026
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-800 leading-[1.1] tracking-tight">
              Discover Your Style with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                Premium Products
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Shop the latest trends with unbeatable prices and quality.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                Shop Now
              </button>

              <button className="px-8 py-4 border-2 border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-500 text-lg font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 bg-white">
                Explore Products
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start text-gray-500">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-slate-800">200+</span>
                <span className="text-sm">Premium Brands</span>
              </div>

              <div className="w-px h-10 bg-gray-300"></div>

              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-slate-800">15k+</span>
                <span className="text-sm">Happy Customers</span>
              </div>

              <div className="w-px h-10 bg-gray-300 hidden sm:block"></div>

              <div className="hidden sm:flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-slate-800">99%</span>
                <span className="text-sm">Satisfaction</span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 flex justify-center lg:justify-end relative">
            <div className="absolute inset-0 bg-orange-400/10 rounded-full blur-3xl scale-75 translate-y-10"></div>

            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
              alt="Products"
              className="relative w-full max-w-md lg:max-w-2xl rounded-3xl shadow-lg transition-all duration-700 hover:scale-[1.03] hover:-translate-y-4"
            />

            {/* Floating Card 1 */}
            <div className="absolute bottom-4 left-4 bg-white border border-gray-200 p-4 rounded-2xl shadow-md hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  4.9
                </div>
                <div>
                  <p className="text-slate-800 font-semibold text-sm">
                    Top Rated
                  </p>
                  <p className="text-gray-500 text-xs">Excellent Reviews</p>
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute top-4 right-4 bg-white border border-gray-200 p-3 rounded-2xl shadow-md hidden sm:block">
              <div className="flex items-center gap-2 text-orange-500">
                ⭐{" "}
                <span className="text-slate-800 font-bold text-sm">
                  Trending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
