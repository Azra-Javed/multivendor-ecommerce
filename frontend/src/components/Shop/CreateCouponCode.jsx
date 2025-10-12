import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllProductsShop } from "../../redux/features/productSlice";

const CreateCouponCode = ({ setOpen }) => {
  const { products } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          value,
          minAmount,
          maxAmount,
          selectedProducts,
          shopId: seller._id,
        },
        { withCredentials: true }
      );
      toast.success("Coupon code created successfully!");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const inputClass =
    "mt-1 block w-full px-3 h-9 border border-gray-300 rounded-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] focus:border-[#2D6A4F]";

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[2000] flex items-center justify-center">
      <div className="w-[90%] 800px:w-[40%] bg-white rounded-lg shadow p-4 overflow-y-auto max-h-[80vh]">
        <div className="flex justify-end mb-4">
          <RxCross1
            size={28}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4">
          Create Coupon Code
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Enter coupon code name..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Discount Percentage <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={value}
              required
              onChange={(e) => setValue(e.target.value)}
              className={inputClass}
              placeholder="Enter coupon discount value..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Min Amount</label>
              <input
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                className={inputClass}
                placeholder="Minimum amount..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Max Amount</label>
              <input
                type="number"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                className={inputClass}
                placeholder="Maximum amount..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Select Product <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedProducts}
              onChange={(e) => setSelectedProducts(e.target.value)}
              className={inputClass + " cursor-pointer"}
            >
              <option value="" disabled>
                Choose your product
              </option>
              {products?.map((p) => (
                <option key={p._id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2D6A4F] text-white py-2 rounded-sm text-sm font-medium hover:bg-[#1f5239] transition-colors"
          >
            Create Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCouponCode;
