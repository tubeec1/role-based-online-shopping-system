import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../features/category/categorySlice";
import { toast } from "react-hot-toast";
import { FiEdit, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import Toaster from "react-hot-toast";
import { FiImage } from "react-icons/fi";
const Categories = () => {
  const dispatch = useDispatch();

  const { categories, loading } = useSelector((state) => state.categories);

  const [isOpen, setIsOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const openCreateModal = () => {
    setEditingCategory(null);

    setFormData({
      name: "",
      description: "",
      image: null,
    });

    setPreview("");

    setIsOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);

    setFormData({
      name: category.name,
      description: category.description,
      image: null,
    });

    setPreview(
      `http://localhost/online-shopping-system/backend/public/${category.image}`,
    );

    setIsOpen(true);
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

    data.append("name", formData.name);
    data.append("description", formData.description);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editingCategory) {
        await dispatch(
          updateCategory({
            id: editingCategory.id,
            formData: data,
          }),
        ).unwrap();

        toast.success("Category Updated Successfully");
      } else {
        await dispatch(createCategory(data)).unwrap();

        toast.success("Category Created Successfully");
      }

      dispatch(getCategories());

      setIsOpen(false);
    } catch (error) {
      toast.error(error?.message || "Operation Failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteCategory(id)).unwrap();

      toast.success("Category Deleted Successfully");
    } catch (error) {
      toast.error(error?.message || "Delete Failed");
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Categories</h1>

          <p className="text-gray-500 mt-1">Manage your product categories</p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
        >
          <FiPlus />
          Add Category
        </button>
      </div>

      {/* Categories Table */}

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-6 py-4">Image</th>

                <th className="text-left px-6 py-4">Name</th>

                <th className="text-left px-6 py-4">Description</th>

                <th className="text-left px-6 py-4">Created At</th>

                <th className="text-center px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    Loading...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    No Categories Found
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={`http://localhost/online-shopping-system/backend/public/${category.image}`}
                        alt={category.name}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                    </td>

                    <td className="px-6 py-4 font-semibold">{category.name}</td>

                    <td className="px-6 py-4 text-gray-600">
                      {category.description}
                    </td>

                    <td className="px-6 py-4">{category.created_at}</td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => openEditModal(category)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(category.id)}
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

      {/* Modal */}

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingCategory ? "Update Category" : "Create Category"}
              </h2>

              <button onClick={() => setIsOpen(false)}>
                <FiX size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block mb-2 font-medium">Category Name</label>

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
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Image</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {preview && (
                  <div className="mt-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-xl border"
                    />
                  </div>
                )}

                {!preview && (
                  <div className="mt-4 w-32 h-32 border rounded-xl flex items-center justify-center text-gray-400">
                    <FiImage size={30} />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
              >
                {editingCategory ? "Update Category" : "Create Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
