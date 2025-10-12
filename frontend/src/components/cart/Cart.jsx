import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/features/cartSlice";
import SingleCart from "./SingleCart";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data._id));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  return (
    <div className="fixed inset-0 bg-[#0000004b] z-40 flex justify-end">
      <div
        className={`w-[90%] sm:w-[60%] md:w-[40%] lg:w-[28%] h-full bg-gradient-to-b from-white to-[#f8fff8] shadow-2xl flex flex-col  border-l border-[#E3F1E5] transition-all duration-300 ${
          cart.length > 2 ? "overflow-y-auto" : "min-h-screen"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E3F1E5] ">
          <div className="flex items-center">
            <IoBagHandleOutline size={25} className="text-[#2D6A4F]" />
            <h5 className="pl-2 text-[18px] font-semibold text-[#1B4332]">
              {cart.length} {cart.length > 1 ? "Items" : "Item"}
            </h5>
          </div>
          <RxCross1
            size={25}
            className="cursor-pointer text-gray-500 hover:text-[#2D6A4F] transition"
            onClick={() => setOpenCart(false)}
          />
        </div>

        {/* Empty Cart */}
        {cart && cart.length === 0 ? (
          <div className="flex flex-col flex-1 items-center justify-center text-gray-500 py-20">
            <IoBagHandleOutline size={60} className="text-[#2D6A4F] mb-3" />
            <h5 className="text-lg font-semibold text-[#1B4332]">
              Your cart is empty
            </h5>
            <p className="text-sm text-gray-400 mt-1">
              Add some freshness to your cart 🌿
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="px-4 py-3 flex-grow">
              {cart.map((i, index) => (
                <SingleCart
                  key={index}
                  data={i}
                  quantityChangeHandler={quantityChangeHandler}
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))}
            </div>

            {/* Checkout Section */}
            <div className="p-5 border-t border-[#E3F1E5] bg-[#F3FFF5] mt-auto">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[16px] font-medium text-[#1B4332]">
                  Subtotal
                </h4>
                <h4 className="text-[18px] font-semibold text-[#2D6A4F]">
                  ${totalPrice?.toFixed(2)}
                </h4>
              </div>

              <Link to="/checkout">
                <div className="h-[48px] flex items-center justify-center w-full rounded-xl font-semibold text-[#1B4332] bg-gradient-to-r from-[#B7E4C7] to-[#95D5B2] hover:from-[#95D5B2] hover:to-[#74C69D] shadow-md hover:shadow-lg transition">
                  Proceed to Checkout
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
