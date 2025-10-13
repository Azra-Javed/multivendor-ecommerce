import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("address", address);
    newForm.append("phoneNumber", Number(phoneNumber));
    newForm.append("zipCode", Number(zipCode));

    axios
      .post(`${server}/shop/create-shop`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setAddress("");
        setPhoneNumber("");
        setZipCode("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white shadow-md rounded-md p-8">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Register as a Seller
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Shop Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Shop Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2D6A4F]"
              placeholder="Enter your shop name"
            />
          </div>

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

          {/* Phone Number */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2D6A4F]"
              placeholder="03XXXXXXXXX"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2D6A4F]"
              placeholder="Enter shop address"
            />
          </div>

          {/* Zip Code */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Zip Code</label>
            <input
              type="number"
              required
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2D6A4F]"
              placeholder="e.g. 54000"
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

          {/* Avatar Upload */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Shop Avatar
            </label>
            <div className="flex items-center space-x-4">
              <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <RxAvatar className="h-10 w-10 text-gray-400" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="cursor-pointer text-sm text-[#2D6A4F] font-medium border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50"
              >
                Upload
                <input
                  type="file"
                  id="file-input"
                  hidden
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-[#FFD166] text-[#2D6A4F] font-semibold rounded-md hover:bg-[#ffca3a] transition"
          >
            Create Shop
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/shop-login" className="text-[#2D6A4F] font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ShopCreate;
