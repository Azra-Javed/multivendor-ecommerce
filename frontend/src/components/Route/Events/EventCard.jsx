import styles from "../../../styles/style.js";
import CountDown from "./CountDown.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice.js";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);

    if (isItemExists) {
      toast.error("Item already in cart");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-full block bg-white shadow shadow-gray-300 hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden ${
        active ? "unset" : "mb-12"
      } lg:flex p-4`}
    >
      {/* Product Image */}
      <div className="w-full lg:w-[50%] flex justify-center items-center relative">
        {/* SALE Badge */}
        {data.discountPrice && (
          <span className="absolute top-4 left-4 bg-[#FFD166] text-[#2D6A4F] z-99 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            SALE
          </span>
        )}
        <img
          src={data?.images?.[0]?.url}
          alt={data.name}
          className="w-[90%] h-[380px] object-cover rounded-2xl shadow-sm hover:scale-[1.02] transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="w-full lg:w-[50%] flex flex-col justify-center px-4 py-3">
        {/* Title */}
        <h2 className={`${styles.productTitle} mb-2 text-[#2D6A4F] capitalize`}>
          {data.name}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-[15px] leading-relaxed mb-4 line-clamp-3">
          {data.description}
        </p>

        {/* Pricing and Sold Info */}
        <div className="flex py-2 justify-between items-center">
          <div className="flex items-center">
            {data.originalPrice && (
              <h5 className="text-[16px] text-gray-400 line-through pr-3 font-poppins">
                ${data.originalPrice}
              </h5>
            )}
            <h5 className="text-[20px] font-bold text-[#2D6A4F] font-poppins">
              ${data.discountPrice}
            </h5>
          </div>

          <span className="pr-3 font-[500] text-[16px] text-[#3BC177]">
            {data.sold_out} sold
          </span>
        </div>

        {/* Countdown Timer */}
        <div className="mt-2">
          <CountDown data={data} />
        </div>

        {/* Buttons */}
        <div className="flex items-center mt-4">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div
              className={`${styles.button} bg-[#3BC177] hover:bg-[#2D6A4F] text-white font-[600] mr-4 transition-all duration-300`}
            >
              See Details
            </div>
          </Link>

          <div
            className={`${styles.button} bg-[#2D6A4F] hover:bg-[#3BC177] text-white font-[600] transition-all duration-300`}
            onClick={() => addToCartHandler(data._id)}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
