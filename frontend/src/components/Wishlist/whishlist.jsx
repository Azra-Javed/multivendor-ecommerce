import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/features/wishlistSlice";
import { addToCart } from "../../redux/features/cartSlice";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data._id));
  };

  const addToCartHandler = (data) => {
    const updatedData = { ...data, qty: 1 };
    dispatch(addToCart(updatedData));
    setOpenWishlist(false);
  };

  return (
    <div className="fixed inset-0 bg-[#0000004b]  z-40 flex justify-end">
      <div
        className="w-[90%] sm:w-[60%] md:w-[40%] lg:w-[28%] h-full bg-gradient-to-b 
        from-white to-[#f8fff8] shadow-2xl flex flex-col  border-l border-[#E3F1E5]
        transition-all duration-300 overflow-y-auto overflow-x-hidden"
      >
        {wishlist && wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[#1B4332]">
            <button
              className="absolute top-5 right-5 text-gray-500 hover:text-[#2D6A4F] transition"
              onClick={() => setOpenWishlist(false)}
            >
              <RxCross1 size={25} />
            </button>
            <AiOutlineHeart size={60} className="text-[#2D6A4F] mb-3" />
            <h5 className="text-lg font-semibold">Your wishlist is empty</h5>
            <p className="text-sm text-gray-400 mt-1">Add items you love 💚</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#E3F1E5] bg-[#F3FFF5] rounded-tl-2xl">
              <div className="flex items-center">
                <AiOutlineHeart size={25} className="text-[#2D6A4F]" />
                <h5 className="pl-2 text-[18px] font-semibold text-[#1B4332]">
                  {wishlist.length} {wishlist.length > 1 ? "Items" : "Item"}
                </h5>
              </div>
              <RxCross1
                size={25}
                className="cursor-pointer text-gray-500 hover:text-[#2D6A4F] transition"
                onClick={() => setOpenWishlist(false)}
              />
            </div>

            {/* Wishlist Items */}
            <div
              className={`flex-1 px-4 py-3 ${
                wishlist.length > 2 ? "overflow-y-auto" : ""
              } overflow-x-hidden`}
            >
              {wishlist.map((i, index) => (
                <WishlistSingle
                  key={index}
                  data={i}
                  removeFromWishlistHandler={removeFromWishlistHandler}
                  addToCartHandler={addToCartHandler}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const WishlistSingle = ({
  data,
  removeFromWishlistHandler,
  addToCartHandler,
}) => {
  const [value] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="flex items-center justify-between border-b border-[#E6F0E6] py-3 px-2 rounded-lg hover:bg-[#F9FFF9] transition-all">
      {/* Remove Button */}
      <button
        onClick={() => removeFromWishlistHandler(data)}
        className="text-gray-400 hover:text-[#2D6A4F] transition flex-shrink-0"
      >
        <RxCross1 size={18} />
      </button>

      {/* Product Image */}
      <img
        src={data?.images?.[0]?.url}
        alt={data.name}
        className="w-[70px] h-[70px] object-cover rounded-md border border-[#E6F0E6] shadow-sm mx-3 flex-shrink-0"
      />

      {/* Product Info */}
      <div className="flex flex-col flex-1 min-w-0">
        <h4 className="text-[#1B4332] text-[15px] font-semibold leading-tight truncate">
          {data.name}
        </h4>
        <span className="text-[15px] font-bold text-[#2D6A4F] mt-1">
          ${totalPrice.toFixed(2)}
        </span>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCartHandler(data)}
        title="Add to cart"
        className="text-[#1B4332] hover:text-[#2D6A4F] transition ml-3 flex-shrink-0"
      >
        <BsCartPlus size={20} />
      </button>
    </div>
  );
};

export default Wishlist;
