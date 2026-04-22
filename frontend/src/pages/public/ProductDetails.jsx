import React, { useState } from "react";
import {
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiZap,
  FiTruck,
  FiCheckCircle,
  FiStar,
  FiHeart,
} from "react-icons/fi";

const product = {
  id: 1,
  name: "Premium Wireless Headphones",
  category: "Electronics",
  price: 129.99,
  oldPrice: 179.99,
  description:
    "Experience unparalleled audio quality with advanced noise-cancellation and 30-hour battery life.",
  specs: [
    { label: "Brand", value: "AudioPro" },
    { label: "Model", value: "AP-X900" },
    { label: "Connectivity", value: "Bluetooth 5.2" },
    { label: "Battery", value: "30 Hours" },
  ],
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800",
  ],
  rating: 4.5,
  reviews: 124,
  stock: 15,
};

let ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const discount =
    product.oldPrice &&
    Math.round((1 - product.price / product.oldPrice) * 100);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* IMAGES */}
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm group">
              <img
                src={product.images[selectedImage]}
                alt=""
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {discount && (
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-lg font-semibold">
                  -{discount}%
                </span>
              )}

              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:text-red-500">
                <FiHeart />
              </button>
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    selectedImage === i
                      ? "border-orange-500"
                      : "border-transparent opacity-60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <p className="text-orange-500 text-sm font-semibold uppercase">
              {product.category}
            </p>

            <h1 className="text-3xl font-bold text-blue-950 mt-2">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`${
                    i < Math.floor(product.rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-3xl font-bold text-orange-500">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="line-through text-gray-400">
                  ${product.oldPrice}
                </span>
              )}
            </div>

            <p className="text-gray-600 mt-4">{product.description}</p>

            {/* QUANTITY */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <FiMinus />
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <FiPlus />
                </button>
              </div>

              <span className="text-sm text-green-600 flex items-center gap-1">
                <FiCheckCircle />
                In Stock
              </span>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-6">
              <button className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-orange-600">
                <FiShoppingCart />
                Add to Cart
              </button>

              <button className="flex-1 bg-blue-950 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-900">
                <FiZap />
                Buy Now
              </button>
            </div>

            {/* EXTRA INFO */}
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FiTruck />
                Fast delivery (1–3 days)
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle />
                Secure payment
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex gap-6 border-b mb-6">
            {["description", "specs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 ${
                  activeTab === tab
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : "text-gray-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <p className="text-gray-600">{product.description}</p>
          )}

          {activeTab === "specs" && (
            <div className="space-y-2">
              {product.specs.map((s, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-500">{s.label}</span>
                  <span className="font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
