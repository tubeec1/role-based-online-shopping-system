import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShoppingCart,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

import {
  loginUser,
  getMe,
  clearAuthState,
} from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, loading, error, success, message } = useSelector(
    (state) => state.auth,
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (success && token) {
      toast.success(message || "Login Successful");

      dispatch(getMe());

      setTimeout(() => {
        navigate("/");
        dispatch(clearAuthState());
      }, 1500);
    }
  }, [success, token, message, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    if (!formData.email || !formData.password) {
      setFormError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setFormError("Please enter a valid email");
      return;
    }

    dispatch(
      loginUser({
        email: formData.email,
        password: formData.password,
      }),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-blue-950 text-white relative">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>

          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-10">
              <FiShoppingCart className="text-orange-500 text-3xl" />
              <span className="text-2xl font-bold">Tubec</span>
            </div>

            <h2 className="text-4xl font-extrabold leading-tight mb-4">
              Welcome Back 👋
            </h2>

            <p className="text-blue-200 text-lg max-w-md">
              Login to your account to manage orders, checkout faster, and enjoy
              your shopping experience.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1000&auto=format&fit=crop"
            alt="Shopping"
            className="rounded-2xl mt-10 object-cover h-64 opacity-80"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          {/* MOBILE LOGO */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <FiShoppingCart className="text-orange-500 text-2xl" />
              <span className="text-xl font-bold text-blue-950">Tubec</span>
            </div>
          </div>

          {/* HEADER */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-blue-950">Sign In</h1>

            <p className="text-gray-500 mt-2">Enter your email and password</p>
          </div>

          {/* FORM ERROR */}
          {formError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm">
              {formError}
            </div>
          )}

          {/* API ERROR */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm">
              {error?.message ||
                error?.error ||
                error?.errors?.email ||
                "Login failed"}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block mb-2 text-sm text-gray-600">
                Email Address
              </label>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-2 text-sm text-gray-600">
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* OPTIONS */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-orange-500" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-orange-500 font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition shadow-md disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* SIGNUP */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-500 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
