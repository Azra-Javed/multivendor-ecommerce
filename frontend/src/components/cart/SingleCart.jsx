import { useState } from "react";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const SingleCart = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (item) => {
    if (item.stock <= value) {
      toast.error("Product stock limited");
    } else {
      const newQty = value + 1;
      setValue(newQty);
      quantityChangeHandler({ ...item, qty: newQty });
    }
  };

  const decrement = (item) => {
    const newQty = value === 1 ? 1 : value - 1;
    setValue(newQty);
    quantityChangeHandler({ ...item, qty: newQty });
  };

  return (
    <div className="flex items-center justify-between border-b border-[#E6F0E6] py-3">
      {/* Quantity Controls */}
      <div className="flex flex-col items-center mr-3">
        <button
          onClick={() => increment(data)}
          className="bg-[#B7E4C7] hover:bg-[#95D5B2] text-[#1B4332] rounded-full w-[26px] h-[26px] flex items-center justify-center transition"
        >
          <HiPlus size={16} />
        </button>

        <span className="text-[14px] font-semibold my-1 text-[#1B4332]">
          {value}
        </span>

        <button
          onClick={() => decrement(data)}
          className="bg-[#E9F5E9] hover:bg-[#CDEAD3] text-[#1B4332] rounded-full w-[26px] h-[26px] flex items-center justify-center transition"
        >
          <HiOutlineMinus size={15} />
        </button>
      </div>
      {/* Image */}
      <img
        src={data?.images?.[0]?.url}
        alt={data.name}
        className="w-[70px] h-[70px] object-cover rounded-md border border-[#E6F0E6]"
      />

      {/* Product Info */}
      <div className="flex flex-col flex-1 ml-3">
        <h4 className="text-[#1B4332] text-[15px] font-semibold leading-tight">
          {data.name}
        </h4>
        <span className="text-[14px] text-[#5B7058]">
          ${data.discountPrice} × {value}
        </span>
        <span className="text-[15px] font-bold text-[#2D6A4F] mt-1">
          ${totalPrice.toFixed(2)}
        </span>
      </div>

      {/* Remove Button */}
      <RxCross1
        className="cursor-pointer ml-3 text-gray-400 hover:text-[#2D6A4F] transition"
        size={18}
        onClick={() => removeFromCartHandler(data)}
      />
    </div>
  );
};

export default SingleCart;
