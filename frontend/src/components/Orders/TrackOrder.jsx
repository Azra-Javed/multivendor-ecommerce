import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/features/orderSlice";
import { useParams } from "react-router-dom";
import {
  FaBox,
  FaTruck,
  FaShippingFast,
  FaCheckCircle,
  FaHome,
  FaUndo,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const TrackOrder = () => {
  const { orders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { id } = useParams();

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
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Order Tracking</h1>

      {loading ? (
        <p className="text-gray-500">Loading your order...</p>
      ) : data ? (
        <>
          {/* Progress Bar */}
          <div className="hidden md:flex items-center w-full max-w-5xl overflow-x-auto">
            {statuses.map((status, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center relative min-w-[100px]"
              >
                {/* Circle */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white z-10 text-lg
                    ${index <= currentIndex ? "bg-green-500" : "bg-gray-300"}`}
                >
                  {status.icon}
                </div>
                {/* Line */}
                {index < statuses.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-1 -translate-x-1/2 ${
                      index < currentIndex ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                )}
                {/* Label */}
                <p
                  className={`text-sm mt-4 text-center w-28 ${
                    index <= currentIndex
                      ? "text-green-600 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {status.label}
                </p>
              </div>
            ))}
          </div>

          {/* Current Status Info */}
          <div className="md:mt-10 text-center">
            <p className="text-lg text-gray-700">
              Current Status:{" "}
              <span className="font-semibold text-green-600">
                {currentStatus}
              </span>
            </p>
            <p className="text-gray-500 mt-3 max-w-lg">
              {messages[currentStatus]}
            </p>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No order found for this ID.</p>
      )}
    </div>
  );
};

export default TrackOrder;
