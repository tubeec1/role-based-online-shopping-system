import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import api from "../../api/axios";

const CategoryDetails = () => {
  const { categoryName } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await api.get(`/api/products/category/${categoryName}`);

      setProducts(response.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryName]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const imageUrl = (image) => {
    if (!image) {
      return "https://via.placeholder.com/600x400";
    }

    return `http://localhost/online-shopping-system/backend/public/${image}`;
  };

  const category =
    products.length > 0
      ? {
          name: products[0].category_name,
          description: products[0].category_description,
          image: products[0].category_image,
        }
      : null;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg font-medium">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Category Banner */}
      {category && (
        <div className="relative h-[400px] overflow-hidden">
          <img
            src={imageUrl(category.image)}
            alt={category.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60"></div>

          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="mb-6 px-5 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition"
              >
                ← Back
              </button>

              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {category.name}
              </h1>

              <p className="text-white/90 mt-4 max-w-2xl mx-auto">
                {category.description}
              </p>

              <div className="mt-6">
                <span className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                  {products.length} Products Available
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow">
            <h2 className="text-2xl font-bold">No Products Found</h2>

            <p className="text-gray-500 mt-3">
              No products available in this category.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Products</h2>

              <span className="text-gray-500">{products.length} Items</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                >
                  {/* Product Image */}
                  <div
                    onClick={() => navigate(`/product-details/${product.id}`)}
                    className="h-64 overflow-hidden cursor-pointer bg-gray-100"
                  >
                    <img
                      src={imageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs px-3 py-1 bg-orange-100 text-orange-600 rounded-full font-medium">
                        {product.category_name}
                      </span>

                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
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

                    <h3
                      onClick={() => navigate(`/product-details/${product.id}`)}
                      className="text-lg font-bold text-gray-900 cursor-pointer hover:text-orange-500 transition"
                    >
                      {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm mt-2 h-10 overflow-hidden">
                      {product.description}
                    </p>

                    <div className="mt-4">
                      <span className="text-3xl font-bold text-orange-500">
                        ${product.price}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="mt-5 flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock <= 0}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          product.stock > 0
                            ? "bg-orange-500 hover:bg-orange-600 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {product.stock > 0 ? "Add To Cart" : "Out Of Stock"}
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/product-details/${product.id}`)
                        }
                        className="px-5 border border-orange-500 text-orange-500 rounded-xl hover:bg-orange-50 transition-all duration-300"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryDetails;
