import { useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-center text-[#2D6A4F] mb-4">
        Change Password
      </h1>

      <form onSubmit={passwordChangeHandler} className="flex flex-col gap-5">
        <div>
          <label className="block text-gray-700 mb-1">Old Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#FFD166] outline-none transition"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#FFD166] outline-none transition"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#FFD166] outline-none transition"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2D6A4F] text-white py-2 rounded-md hover:bg-[#256844] transition font-medium"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
