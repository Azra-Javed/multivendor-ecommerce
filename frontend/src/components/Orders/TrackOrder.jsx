import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/features/orderSlice";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBox,
  FaTruck,
  FaShippingFast,
  FaCheckCircle,
  FaHome,
  FaUndo,
  FaMoneyCheckAlt,
  FaArrowLeft,
} from "react-icons/fa";

const TrackOrder = () => {
  const { orders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrders(user._id));
    }
  }, [dispatch, user?._id]);

  const data = orders && orders.find((item) => item._id === id);

  const statuses = [
    { label: "Processing", icon: <FaBox /> },
    { label: "Transferred to delivery partner", icon: <FaTruck /> },
    { label: "Shipping", icon: <FaShippingFast /> },
    { label: "Received", icon: <FaCheckCircle /> },
    { label: "On the way", icon: <FaTruck /> },
    { label: "Delivered", icon: <FaHome /> },
    { label: "Processing refund", icon: <FaUndo /> },
    { label: "Refund Success", icon: <FaMoneyCheckAlt /> },
  ];

  const messages = {
    Processing: "Your order is being processed in our shop.",
    "Transferred to delivery partner":
      "Your order has been handed to our delivery partner.",
    Shipping: "Your order is on the way with the delivery partner.",
    Received: "Your order has reached your city. Preparing for final delivery.",
    "On the way": "Our delivery agent is on the way to your address.",
    Delivered: "Your order has been delivered successfully!",
    "Processing refund": "Your refund request is being processed.",
    "Refund Success": "Your refund has been successfully completed.",
  };

  const currentStatus = data?.status || "Processing";
  const currentIndex = statuses.findIndex((s) => s.label === currentStatus);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0  border-b flex items-center justify-between px-4 py-3 z-20 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#2D6A4F] hover:text-[#22543d]"
        >
          <FaArrowLeft /> <span className="font-medium">Back</span>
        </button>
        <h1 className="text-lg md:text-xl font-semibold text-[#2D6A4F]">
          Order Tracking
        </h1>
        <div className="w-10" />
      </div>

      {/* Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 overflow-y-auto">
        {loading ? (
          <p className="text-gray-500">Loading your order...</p>
        ) : data ? (
          <>
            {/* Progress Bar */}
            <div className="hidden md:flex items-center w-full max-w-5xl overflow-x-auto justify-center mb-10">
              {statuses.map((status, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center relative min-w-[100px]"
                >
                  {/* Circle */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-white z-10 text-lg transition-all duration-300
                      ${
                        index <= currentIndex
                          ? "bg-[#2D6A4F]"
                          : "bg-gray-300 text-gray-600"
                      }`}
                  >
                    {status.icon}
                  </div>

                  {/* Line */}
                  {index < statuses.length - 1 && (
                    <div
                      className={`absolute top-5 left-1/2 w-full h-[3px] -translate-x-1/2 transition-all duration-300 ${
                        index < currentIndex ? "bg-[#FFD166]" : "bg-gray-200"
                      }`}
                    ></div>
                  )}

                  {/* Label */}
                  <p
                    className={`text-sm mt-4 text-center w-28 transition-colors ${
                      index <= currentIndex
                        ? "text-[#2D6A4F] font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {status.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile dots */}
            <div className="flex md:hidden gap-2 mb-8">
              {statuses.map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentIndex ? "bg-[#2D6A4F]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-800">
                Current Status:{" "}
                <span className="font-semibold text-[#2D6A4F]">
                  {currentStatus}
                </span>
              </p>
              <p className="text-gray-600 mt-3 max-w-lg mx-auto">
                {messages[currentStatus]}
              </p>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No order found for this ID.</p>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
