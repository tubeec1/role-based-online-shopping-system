import React from "react";
import Home from "../../../pages/public/Home";

let HomeNewsLetter = () => {
  return (
    <section className="bg-white py-28 relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-orange-100/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-3xl"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* TEXT */}
        <span className="inline-block text-sm font-semibold text-orange-500 uppercase tracking-widest mb-4">
          Newsletter
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950 tracking-tight">
          Stay Updated with Our Latest Offers
        </h2>

        <p className="mt-4 text-gray-500 text-lg leading-relaxed max-w-xl mx-auto">
          Subscribe to get exclusive deals, new arrivals, and special discounts
          directly in your inbox.
        </p>

        {/* FORM */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto"
        >
          {/* INPUT */}
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
                />
              </svg>
            </div>

            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full pl-14 pr-6 py-4 bg-white border border-gray-200 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 shadow-sm hover:border-gray-300"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Subscribe
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </form>

        {/* NOTE */}
        <p className="mt-5 text-xs text-gray-400">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default HomeNewsLetter;
