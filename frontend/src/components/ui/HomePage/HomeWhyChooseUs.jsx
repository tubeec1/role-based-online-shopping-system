import React from "react";
import { FiTruck, FiShield, FiRotateCcw, FiHeadphones } from "react-icons/fi";

const features = [
  {
    id: 1,
    icon: FiTruck,
    title: "Free Shipping",
    description:
      "Enjoy free shipping on all orders over $50. Fast and reliable delivery right to your doorstep.",
  },
  {
    id: 2,
    icon: FiShield,
    title: "Secure Payment",
    description:
      "Your transactions are protected with industry-standard encryption and secure payment gateways.",
  },
  {
    id: 3,
    icon: FiRotateCcw,
    title: "Easy Returns",
    description:
      "Not satisfied? Return your items easily within 30 days for a full refund.",
  },
  {
    id: 4,
    icon: FiHeadphones,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available anytime to assist you.",
  },
];

let HomeWhyChooseUs = () => {
  return (
    <section className="bg-white py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950 tracking-tight">
            Experience Shopping Like Never Before
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            We focus on quality, speed, and trust to give you the best online
            shopping experience.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Hover Gradient Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-500 opacity-0 group-hover:opacity-10 transition duration-300"></div>

                {/* Icon */}
                <div
                  className="relative w-16 h-16 mx-auto mb-6 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 
                  group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg"
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-blue-950 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeWhyChooseUs;
