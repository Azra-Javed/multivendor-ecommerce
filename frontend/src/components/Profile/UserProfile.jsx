import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/style";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUser,
  updateUserInformation,
} from "../../redux/features/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";

const UserProfile = () => {
  const { user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation({ name, email, password, phoneNumber }));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await axios.put(`${server}/user/update-avatar/${user._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      dispatch(loadUser());
      toast.success("Avatar updated successfully!");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="flex flex-col ml-5 p-3 h-[75vh] md:h-[70vh] overflow-y-auto pb-5 bg-white items-center w-full px-4 sm:px-6 md:px-10">
      {/* Avatar */}
      <div className="relative mb-6">
        <img
          src={avatar ? URL.createObjectURL(avatar) : user?.avatar?.url}
          alt="Avatar"
          className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full object-cover border-2 border-[#3ad132]"
        />
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-2 right-2">
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={handleImage}
          />
          <label htmlFor="image">
            <AiOutlineCamera size={18} />
          </label>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
              Full Name
            </label>
            <input
              type="text"
              required
              className={`${styles.input} w-full`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
              Email Address
            </label>
            <input
              type="email"
              required
              className={`${styles.input} w-full`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
              Phone Number
            </label>
            <input
              type="number"
              required
              className={`${styles.input} w-full`}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              className={`${styles.input} w-full`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[180px] sm:w-[220px] h-10 bg-white border border-[#31642a] text-[#2c6335] font-medium rounded-md hover:bg-[#f0f0ff] transition"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
