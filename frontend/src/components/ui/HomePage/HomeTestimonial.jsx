import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Saida Farah Hassan",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    review:
      "Absolutely love the quality of the products. The delivery was incredibly fast, and the packaging felt so premium. Will definitely shop here again!",
  },
  {
    id: 2,
    name: "Abdirizak Abdi Ali",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    review:
      "The customer service is top-notch. I had an issue with my size and they exchanged it hassle-free. The clothes fit perfectly now.",
  },
  {
    id: 3,
    name: "Deka Ahmed Husein",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4,
    review:
      "Great selection of modern styles. The website is easy to navigate, and the checkout process is super smooth. Highly recommended.",
  },
  {
    id: 4,
    name: "Husni Abdi Weydow",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    review:
      "I was skeptical about buying online, but the product exceeded my expectations. The material is high quality and looks exactly like the pictures.",
  },
  {
    id: 5,
    name: "Yasmin Mohamed Heyle",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    rating: 5,
    review:
      "Best online shopping experience I've had in a long time. The free shipping is a huge plus, and the items arrived two days early!",
  },
  {
    id: 6,
    name: "Hassan Said Ali",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 4,
    review:
      "The tech gadgets I bought are fantastic. Great prices compared to other stores. The user reviews really helped me make the right choice.",
  },
];

let HomeTestimonial = () => {
  return (
    <section className="bg-white py-24 relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Don’t just take our word for it — hear from customers who love our
            products.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition">
                <svg
                  className="w-12 h-12 text-orange-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.17 6A5.001 5.001 0 002 11v7h7v-7H6.26A3.001 3.001 0 019 8V6H7.17zm10 0A5.001 5.001 0 0012 11v7h7v-7h-2.74A3.001 3.001 0 0119 8V6h-1.83z" />
                </svg>
              </div>

              {/* USER */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-orange-100 group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <h3 className="text-base font-bold text-blue-950">
                    {t.name}
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {t.role}
                  </p>
                </div>
              </div>

              {/* STARS */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(t.rating)
                        ? "text-orange-400"
                        : "text-gray-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* REVIEW */}
              <p className="text-gray-600 text-sm leading-relaxed">
                “{t.review}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonial;
