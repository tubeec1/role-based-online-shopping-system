import React from "react";

let HomePromotion = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-orange-50 via-white to-blue-50 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-sm border border-gray-100 overflow-hidden">
          {/* subtle background glow */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs sm:text-sm font-semibold tracking-wide mb-5">
                Limited Offer
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-blue-950 leading-tight tracking-tight">
                Up to 50% Off
                <br className="hidden sm:block" />
                Selected Items
              </h2>

              <p className="mt-5 text-base sm:text-lg text-gray-500 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Discover premium products at unbeatable prices. Limited time
                only — don’t miss your chance.
              </p>

              <button className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-base sm:text-lg font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300">
                Shop Now
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-center lg:justify-end group">
              {/* glow behind image */}
              <div className="absolute inset-0 flex justify-center">
                <div className="w-3/4 h-3/4 bg-orange-300/20 rounded-full blur-3xl"></div>
              </div>

              <div className="relative w-full max-w-md lg:max-w-lg rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=800&auto=format&fit=crop"
                  alt="Promo products"
                  className="w-full h-[320px] sm:h-[420px] object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* DISCOUNT BADGE */}
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-lg sm:text-xl font-bold w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg">
                  -50%
                </div>

                {/* FLOATING CARD */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-md border flex items-center gap-3 hover:scale-105 transition">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    🚚
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-950">
                      Free Shipping
                    </p>
                    <p className="text-xs text-gray-500">Orders over $50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePromotion;
