import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/features/sellerSlice";
import { server } from "../../server";

const ShopSetting = () => {
  const { seller, error } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const [name, setName] = useState(seller?.name || "");
  const [description, setDescription] = useState(seller?.description || "");
  const [address, setAddress] = useState(seller?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber || "");
  const [zipCode, setZipCode] = useState(seller?.zipCode || "");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await axios.put(`${server}/shop/update-avatar/${seller._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      dispatch(loadSeller());
      toast.success("Avatar updated successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update avatar");
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${server}/shop/update-shop-info`,
        { name, address, description, phoneNumber, zipCode },
        { withCredentials: true }
      );
      toast.success("Shop updated successfully!");
      dispatch(loadSeller());
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update shop info");
    }
  };

  const inputClass =
    "mt-2 block w-full px-3 h-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] focus:border-[#2D6A4F] text-sm";

  return (
    <div className="w-full flex justify-center bg-gray-100 py-10 max-h-[80vh] overflow-y-auto">
      <div className="w-[95%] md:w-[70%] lg:w-[50%] bg-white rounded-lg shadow p-6 flex flex-col items-center h-full">
        {/* Avatar */}
        <div className="relative mb-6">
          <img
            src={avatar ? URL.createObjectURL(avatar) : seller?.avatar?.url}
            alt="avatar"
            className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover"
          />
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer absolute bottom-1 right-1">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
            />
            <label htmlFor="image">
              <AiOutlineCamera className="text-gray-600" size={20} />
            </label>
          </div>
        </div>

        {/* Shop Form */}
        <form
          className="w-full flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="w-full mb-4">
            <label className="block text-sm font-medium mb-1">Shop Name</label>
            <input
              type="text"
              className={inputClass}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter shop name"
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-sm font-medium mb-1">
              Shop Description
            </label>
            <input
              type="text"
              className={inputClass}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter shop description"
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-sm font-medium mb-1">
              Shop Address
            </label>
            <input
              type="text"
              className={inputClass}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter shop address"
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-sm font-medium mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              className={inputClass}
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter contact number"
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-sm font-medium mb-1">Zip Code</label>
            <input
              type="number"
              className={inputClass}
              required
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter zip code"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2D6A4F] text-white py-2 rounded-md text-sm font-medium hover:bg-[#1f5239] transition-colors"
          >
            Update Shop
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopSetting;
