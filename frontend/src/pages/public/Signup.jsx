import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShoppingCart,
  FiGlobe,
} from "react-icons/fi";

import { registerUser } from "../../features/auth/authSlice";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    nationality: "",
  });

  const [show, setShow] = useState({
    password: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (success) {
      toast.success(
        "Successfully registered! Redirecting to login in 5 seconds...",
      );

      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const err = {};

    if (!form.fullName.trim()) {
      err.fullName = "Full name is required";
    }

    if (!form.gender) {
      err.gender = "Please select gender";
    }

    if (!form.email.trim()) {
      err.email = "Email is required";
    }

    if (!form.country.trim()) {
      err.country = "Country is required";
    }

    if (!form.nationality.trim()) {
      err.nationality = "Nationality is required";
    }

    if (!form.password) {
      err.password = "Password is required";
    }

    if (form.password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const userData = {
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      gender: form.gender,
      country: form.country,
      nationality: form.nationality,
    };

    dispatch(registerUser(userData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        <Toaster position="top-right" reverseOrder={false} />
        {/* LEFT SIDE */}
        <div className="hidden lg:flex relative bg-blue-950 text-white p-12 flex-col justify-center">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full"></div>

          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <FiShoppingCart className="text-orange-500 text-3xl" />
              <span className="text-2xl font-bold">Tubec</span>
            </div>

            <h2 className="text-4xl font-extrabold leading-tight mb-4">
              Start Your Shopping Journey
            </h2>

            <p className="text-blue-200">
              Create an account and enjoy shopping with us.
            </p>

            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop"
              alt="shopping"
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

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm">
              {error?.message || error?.error || "Registration failed"}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* FULL NAME */}
            <div>
              <div className="relative">
                <FiUser className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full pl-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50"
                />
              </div>

              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <div className="relative">
                <FiMail className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full pl-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            {/* GENDER */}
            <div>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full py-3.5 px-4 rounded-xl border border-gray-200 bg-gray-50"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>

            {/* COUNTRY */}
            <div>
              <div className="relative">
                <FiGlobe className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="w-full pl-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50"
                />
              </div>

              {errors.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>

            {/* NATIONALITY */}
            <div>
              <div className="relative">
                <FiGlobe className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="nationality"
                  value={form.nationality}
                  onChange={handleChange}
                  placeholder="Nationality"
                  className="w-full pl-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50"
                />
              </div>

              {errors.nationality && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.nationality}
                </p>
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
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShow({
                      ...show,
                      password: !show.password,
                    })
                  }
                  className="absolute right-4 top-4 text-gray-400"
                >
                  {show.password ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
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
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShow({
                      ...show,
                      confirm: !show.confirm,
                    })
                  }
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

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
