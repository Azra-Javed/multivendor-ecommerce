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
  const [value, setValue] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  console.log(products);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Coupon code created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  };
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[2000] flex items-center justify-center">
        <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow overflow-y-auto ">
          <div className="w-full flex justify-end p-4">
            <RxCross1
              size={30}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <h5 className="text-[30px] font-family-poppins text-center">
            Create Coupon Code
          </h5>
          <form onSubmit={handleSubmit} className="p-4" aria-required>
            <br />
            <div>
              <label className="pb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter Your coupon code name..."
              />
            </div>

            <br />
            <div>
              <label className="pb-2">
                Discount Percentage <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="value"
                value={value}
                required
                onChange={(e) => setValue(e.target.value)}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter Your coupon code value..."
              />
            </div>

            <br />
            <div>
              <label className="pb-2">Minimum Amount</label>
              <input
                type="number"
                name="minAmount"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter Your coupon code MIn amount..."
              />
            </div>

            <br />
            <div>
              <label className="pb-2">Maximum Amount</label>
              <input
                type="number"
                name="maxAmount"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter Your coupon code max amount..."
              />
            </div>

            <br />
            <div>
              <label className="pb-2">
                Selected Product <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mt-2 border h-[35px] rounded-[5px] cursor-pointer"
                value={selectedProducts}
                onChange={(e) => setSelectedProducts(e.target.value)}
              >
                <option value="Choose Your product" disabled>
                  Choose your product
                </option>
                {products &&
                  products.map((i) => (
                    <option value={i.name} key={i.name}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>

            <br />
            <div>
              <input
                type="submit"
                value="Create"
                className="mt-2 cursor-pointer appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] "
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCouponCode;
