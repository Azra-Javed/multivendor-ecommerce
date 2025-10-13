import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

const ShopLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${server}/shop/shop-login`,
        { email, password },
        { withCredentials: true }
      );
      toast.success("Login Success!");
      navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
      <div className="w-full max-w-md bg-white rounded-md shadow p-6">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Login to Your Shop
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2D6A4F]"
              placeholder="shop@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2D6A4F]"
                placeholder="••••••••"
              />
              {visible ? (
                <AiOutlineEye
                  size={20}
                  className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={20}
                  className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 border-gray-300 rounded mr-2"
              />
              Remember me
            </label>
            <a
              href="/forgot-password"
              className="text-[#2D6A4F] hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-[#FFD166] text-[#2D6A4F] font-semibold rounded-md hover:bg-[#ffca3a] transition"
          >
            Login
          </button>

          {/* Sign Up */}
          <p className="text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link to="/shop-create" className="text-[#2D6A4F] font-medium">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ShopLogin;
