import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../../features/products/productSlice";
import { getCategories } from "../../features/category/categorySlice";
import Toaster from "react-hot-toast";
import { toast } from "react-hot-toast";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FiImage } from "react-icons/fi";

const DashboardProducts = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.products);

  const { categories } = useSelector((state) => state.categories);

  const [isOpen, setIsOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const openCreateModal = () => {
    setEditingProduct(null);

    setFormData({
      category_id: "",
      name: "",
      description: "",
      price: "",
      stock: "",
      image: null,
    });

    setPreview("");

    setIsOpen(true);
  };

  const openEditModal = async (product) => {
    try {
      const response = await dispatch(getProductById(product.id)).unwrap();

      const data = response.data;

      setEditingProduct(data);

      setFormData({
        category_id: data.category?.id || "",
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        stock: data.stock || "",
        image: null,
      });

      setPreview(
        `http://localhost/online-shopping-system/backend/public/${data.image}`,
      );

      setIsOpen(true);
    } catch (error) {
      toast.error("Failed To Load Product");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("category_id", formData.category_id);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editingProduct) {
        await dispatch(
          updateProduct({
            id: editingProduct.id,
            formData: data,
          }),
        ).unwrap();

        toast.success("Product Updated Successfully");
      } else {
        await dispatch(createProduct(data)).unwrap();

        toast.success("Product Created Successfully");
      }

      dispatch(getProducts());

      setIsOpen(false);
    } catch (error) {
      toast.error(error?.message || "Operation Failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteProduct(id)).unwrap();

      toast.success("Product Deleted Successfully");
    } catch (error) {
      toast.error(error?.message || "Delete Failed");
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* HEADER */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>

          <p className="text-gray-500 mt-1">Manage your store products</p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
        >
          <FiPlus />
          Add Product
        </button>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-6 py-4">Image</th>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Category</th>
                <th className="text-left px-6 py-4">Price</th>
                <th className="text-left px-6 py-4">Stock</th>
                <th className="text-left px-6 py-4">Description</th>
                <th className="text-left px-6 py-4">Created At</th>
                <th className="text-center px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-10">
                    Loading...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-10">
                    No Products Found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={`http://localhost/online-shopping-system/backend/public/${product.image}`}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                    </td>

                    <td className="px-6 py-4 font-semibold">{product.name}</td>

                    <td className="px-6 py-4">{product.category?.name}</td>

                    <td className="px-6 py-4 font-semibold text-green-600">
                      ${product.price}
                    </td>

                    <td className="px-6 py-4">{product.stock}</td>

                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                      {product.description}
                    </td>

                    <td className="px-6 py-4">{product.created_at}</td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingProduct ? "Update Product" : "Create Product"}
              </h2>

              <button onClick={() => setIsOpen(false)}>
                <FiX size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block mb-2 font-medium">Category</label>

                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Product Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Description</label>

                <textarea
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium">Price</label>

                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Stock</label>

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Product Image</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {preview ? (
                  <div className="mt-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-xl border"
                    />
                  </div>
                ) : (
                  <div className="mt-4 w-32 h-32 border rounded-xl flex items-center justify-center text-gray-400">
                    <FiImage size={30} />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
              >
                {editingProduct ? "Update Product" : "Create Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProducts;
