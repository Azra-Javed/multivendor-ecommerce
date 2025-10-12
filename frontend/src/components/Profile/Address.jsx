import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";
import {
  deleteUserAddress,
  updateUserAddress,
} from "../../redux/features/userSlice";

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    { name: "Default" },
    { name: "Home" },
    { name: "Office" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("All fields are required.");
    } else {
      dispatch(
        updateUserAddress({
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        })
      )
        .unwrap()
        .then((res) => toast.success(res.message))
        .catch((error) => toast.error(error));

      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode();
      setAddressType("");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteUserAddress(id))
      .unwrap()
      .then((res) => toast.success(res.message))
      .catch((err) => toast.error(err));
  };

  return (
    <div className="w-full px-5">
      {/* ---------- Add Address Modal ---------- */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-[90%] sm:w-[60%] md:w-[50%]  h-[80vh] bg-white rounded-xl shadow-lg relative overflow-y-auto">
            <div className="flex justify-end p-3">
              <RxCross1
                size={26}
                className="cursor-pointer text-gray-600 hover:text-[#2D6A4F] transition"
                onClick={() => setOpen(false)}
              />
            </div>

            <h1 className="text-center text-2xl font-semibold text-[#2D6A4F] mb-2">
              Add New Address
            </h1>

            <form onSubmit={handleSubmit} className="px-6 pb-6">
              {/* Country */}
              <div className="mb-3">
                <label className="block text-gray-700 mb-1">Country</label>
                <select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setCity("");
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#FFD166] outline-none transition"
                >
                  <option value="">Choose your country</option>
                  {Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="mb-3">
                <label className="block text-gray-700 mb-1">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#FFD166] outline-none transition"
                >
                  <option value="">Choose your city</option>
                  {State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address 1 */}
              <div className="mb-3">
                <label className="block text-gray-700 mb-1">Address 1</label>
                <input
                  type="text"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#FFD166] outline-none transition"
                  required
                />
              </div>

              {/* Address 2 */}
              <div className="mb-3">
                <label className="block text-gray-700 mb-1">Address 2</label>
                <input
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#FFD166] outline-none transition"
                  required
                />
              </div>

              {/* Zip Code */}
              <div className="mb-3">
                <label className="block text-gray-700 mb-1">Zip Code</label>
                <input
                  type="number"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#FFD166] outline-none transition"
                  required
                />
              </div>

              {/* Address Type */}
              <div className="mb-5">
                <label className="block text-gray-700 mb-1">Address Type</label>
                <select
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#FFD166] outline-none transition"
                >
                  <option value="">Choose Address Type</option>
                  {addressTypeData.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2D6A4F] text-white font-medium py-2 rounded-md hover:bg-[#256844] transition"
              >
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------- Address List ---------- */}
      <div className="flex items-center justify-between mt-6">
        <h1 className="text-2xl font-semibold text-[#2D6A4F]">My Addresses</h1>
        <button
          className="bg-[#FFD166] text-[#2D6A4F] font-medium px-4 py-2 rounded-md hover:bg-[#ffcd33] transition"
          onClick={() => setOpen(true)}
        >
          + Add New
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {user?.addresses?.length > 0 ? (
          user.addresses.map((item, index) => (
            <div
              key={index}
              className="w-full bg-white shadow-sm border border-gray-200 rounded-lg flex flex-col md:flex-row md:items-center justify-between px-5 py-3 hover:shadow-md transition"
            >
              <div>
                <h5 className="font-semibold text-[#2D6A4F]">
                  {item.addressType}
                </h5>
                <p className="text-gray-700 text-sm">
                  {item.address1}, {item.address2}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-2 md:mt-0">
                <span className="text-gray-600 text-sm">
                  {user?.phoneNumber}
                </span>
                <AiOutlineDelete
                  size={22}
                  className="text-red-500 cursor-pointer hover:text-red-600 transition"
                  onClick={() => handleDelete(item._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center mt-6">No addresses found.</p>
        )}
      </div>
    </div>
  );
};

export default Address;
