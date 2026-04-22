import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShoppingCart,
} from "react-icons/fi";

let Signup = () => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    password: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};

    if (!form.name.trim()) err.name = "Full name is required";
    if (!form.gender) err.gender = "Select gender";
    if (!form.email) err.email = "Email is required";
    if (!form.password) err.password = "Password is required";
    if (form.password !== form.confirmPassword)
      err.confirmPassword = "Passwords do not match";

    setErrors(err);

    if (Object.keys(err).length === 0) {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex relative bg-blue-950 text-white p-12 flex-col justify-center">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <FiShoppingCart className="text-orange-500 text-3xl" />
              <span className="text-2xl font-bold">ShopEase</span>
            </div>

            <h2 className="text-4xl font-extrabold leading-tight mb-4">
              Start your shopping journey today.
            </h2>

            <p className="text-blue-200">
              Create your account and enjoy personalized deals, fast checkout,
              and premium experience.
            </p>

            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop"
              alt=""
              className="mt-8 rounded-2xl shadow-lg opacity-80"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-950">Create Account</h1>
            <p className="text-gray-500 mt-2">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME */}
            <div>
              <div className="relative">
                <FiUser className="absolute left-4 top-4 text-gray-400" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`w-full pl-12 py-3.5 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 outline-none transition ${
                    errors.name
                      ? "border-red-400"
                      : "border-gray-200 focus:border-orange-500"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* GENDER */}
            <div>
              <div className="relative">
                <FiUser className="absolute left-4 top-4 text-gray-400" />
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={`w-full pl-12 py-3.5 rounded-xl border bg-gray-50 appearance-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 outline-none transition ${
                    errors.gender
                      ? "border-red-400"
                      : "border-gray-200 focus:border-orange-500"
                  } ${!form.gender && "text-gray-400"}`}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <div className="relative">
                <FiMail className="absolute left-4 top-4 text-gray-400" />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={`w-full pl-12 py-3.5 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 outline-none transition ${
                    errors.email
                      ? "border-red-400"
                      : "border-gray-200 focus:border-orange-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <div className="relative">
                <FiLock className="absolute left-4 top-4 text-gray-400" />
                <input
                  type={show.password ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full pl-12 pr-12 py-3.5 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 outline-none transition ${
                    errors.password
                      ? "border-red-400"
                      : "border-gray-200 focus:border-orange-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShow({ ...show, password: !show.password })}
                  className="absolute right-4 top-4 text-gray-400"
                >
                  {show.password ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <div className="relative">
                <FiLock className="absolute left-4 top-4 text-gray-400" />
                <input
                  type={show.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={`w-full pl-12 pr-12 py-3.5 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 outline-none transition ${
                    errors.confirmPassword
                      ? "border-red-400"
                      : "border-gray-200 focus:border-orange-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShow({ ...show, confirm: !show.confirm })}
                  className="absolute right-4 top-4 text-gray-400"
                >
                  {show.confirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span className="text-orange-500 font-semibold cursor-pointer">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
