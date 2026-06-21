import React, { useEffect, useState } from "react";
import {
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiZap,
  FiTruck,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

import api from "../../api/axios";

const ProductDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/api/products/show/${id}`);

      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const imageUrl = (image) => {
    if (!image) {
      return "https://via.placeholder.com/600x400";
    }

    return `http://localhost/online-shopping-system/backend/public/${image}`;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();

    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-orange-500 hover:text-orange-600"
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
            <img
              src={imageUrl(product.image)}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Product Information */}
          <div>
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
              {product.category?.name}
            </span>

            <h1 className="text-4xl font-bold text-gray-900 mt-4">
              {product.name}
            </h1>

            <div className="mt-6">
              <span className="text-5xl font-bold text-orange-500">
                ${product.price}
              </span>
            </div>

            <div className="mt-6">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-6">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  product.stock > 0
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} In Stock`
                  : "Out Of Stock"}
              </span>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Quantity</h3>

              <div className="flex items-center border rounded-xl w-fit overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-100"
                >
                  <FiMinus />
                </button>

                <span className="px-6">{quantity}</span>

                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="px-4 py-3 hover:bg-gray-100"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                <FiShoppingCart />
                Add To Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                <FiZap />
                Buy Now
              </button>
            </div>

            {/* Extra Information */}
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <FiTruck className="text-orange-500" />
                Fast Delivery Available
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <FiCheckCircle className="text-green-500" />
                Secure Payment
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <FiCheckCircle className="text-green-500" />
                Original Product Guarantee
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Section */}
        <div className="bg-white rounded-3xl p-8 mt-12 shadow">
          <h2 className="text-2xl font-bold mb-5">Product Description</h2>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <h3 className="font-semibold mb-2">Product ID</h3>

              <p className="text-gray-500">#{product.id}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Category</h3>

              <p className="text-gray-500">{product.category?.name}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Available Stock</h3>

              <p className="text-gray-500">{product.stock}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Added On</h3>

              <p className="text-gray-500">{product.created_at}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
