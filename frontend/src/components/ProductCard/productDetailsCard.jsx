import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cartSlice";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/features/wishlistSlice";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const decrementCount = () => count > 1 && setCount(count - 1);
  const incrementCount = () => setCount(count + 1);

  const addToCartHandler = (id) => {
    const isItemExists = cart?.find((i) => i._id === id);
    if (isItemExists) return toast.error("Item already in cart");
    if (data.stock < count) return toast.error("Product stock limited");

    dispatch(addToCart({ ...data, qty: count }));
    toast.success("Item added to cart successfully!");
  };

  useEffect(() => {
    setClick(wishlist?.some((i) => i._id === data._id));
  }, [wishlist, data._id]);

  const toggleWishlist = () => {
    if (click) {
      dispatch(removeFromWishlist(data._id));
      toast.info("Removed from wishlist!");
    } else {
      dispatch(addToWishlist(data));
      toast.success("Added to wishlist!");
    }
    setClick(!click);
  };

  return (
    <div>
      {data && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="w-[95%] sm:w-[80%] md:w-[70%] lg:w-[65%] max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-5 relative transition-all duration-300">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
            >
              <RxCross1 size={20} />
            </button>

            {/* Layout */}
            <div className="flex flex-col lg:flex-row gap-6 mt-4">
              {/* Left Side (Hidden on Mobile) */}
              <div className="hidden lg:flex w-1/2 flex-col items-center justify-center">
                <div className="relative w-full flex items-center justify-center">
                  {data.originalPrice > data.discountPrice && (
                    <span className="absolute top-3 left-3 bg-yellow-300 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
                      SALE
                    </span>
                  )}
                  <img
                    src={
                      data?.images?.[0]?.url ||
                      "https://via.placeholder.com/400x400.png"
                    }
                    alt={data.name}
                    className="rounded-xl w-[85%] h-[330px] object-cover border border-gray-100"
                  />
                </div>

                {/* Shop Info (only on desktop) */}
                <Link
                  to={`/shop/preview/${data.shop._id}`}
                  className="mt-4 flex items-center gap-3 hover:opacity-80 transition"
                >
                  <img
                    src={data?.shop?.avatar?.url}
                    alt={data.shop.name}
                    className="w-[45px] h-[45px] rounded-full border"
                  />
                  <div>
                    <h3 className="text-[15px] font-semibold text-gray-800">
                      {data.shop.name}
                    </h3>
                    <p className="text-[13px] text-gray-500">4/5 Ratings</p>
                  </div>
                </Link>
              </div>

              {/* Right Side (Main Content) */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between">
                <h1 className="text-[20px] md:text-[22px] font-semibold text-gray-900 mb-2 text-center lg:text-left">
                  {data.name}
                </h1>
                <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed mb-4 line-clamp-5 text-center lg:text-left">
                  {data.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
                  <h2 className="text-[22px] md:text-[24px] font-bold text-[#2D6A4F]">
                    ${data.discountPrice}
                  </h2>
                  {data.originalPrice && (
                    <p className="text-gray-400 line-through text-[16px] md:text-[17px]">
                      ${data.originalPrice}
                    </p>
                  )}
                </div>

                {/* Quantity + Wishlist */}
                <div className="flex items-center justify-between mb-5 w-full">
                  <div className="flex items-center border border-gray-200 rounded-full overflow-hidden mx-auto lg:mx-0">
                    <button
                      onClick={decrementCount}
                      className="bg-gray-100 text-gray-700 px-4 py-2 text-lg font-bold hover:bg-gray-200 transition"
                    >
                      -
                    </button>
                    <span className="px-5 text-gray-800 text-[15px] bg-gray-50">
                      {count}
                    </span>
                    <button
                      onClick={incrementCount}
                      className="bg-gray-100 text-gray-700 px-4 py-2 text-lg font-bold hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                  </div>

                  <div onClick={toggleWishlist} className="ml-4">
                    {click ? (
                      <AiFillHeart
                        size={28}
                        className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={28}
                        className="text-gray-600 cursor-pointer hover:text-red-400 hover:scale-110 transition-transform"
                      />
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCartHandler(data._id)}
                  className="bg-[#2D6A4F] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3B8C66] transition flex items-center justify-center gap-2"
                >
                  <AiOutlineShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsCard;
