import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getShopAllOrders } from "../../redux/features/orderSlice";
import { server } from "../../server";
import styles from "../../styles/style";

const OrderDetails = () => {
  const { shopOrders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getShopAllOrders(seller._id));
  }, [dispatch]);

  const data = shopOrders && shopOrders.find((item) => item._id === id);

  useEffect(() => {
    if (data) {
      setStatus(data.status);
    }
  }, [data]);

  const orderUpdateHandler = async () => {
    await axios
      .patch(
        `${server}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        setStatus(res.data.order.status);
        dispatch(getShopAllOrders(seller._id));
      })
      .catch((error) => toast.error(error?.response?.data?.message));
  };

  const refundOrderUpdateHandler = async () => {
    await axios
      .patch(
        `${server}/order/order-refund-success/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        setStatus(res.data.order.status);
        dispatch(getShopAllOrders(seller._id));
      })
      .catch((error) => toast.error(error?.response?.data?.message));
  };

  const statuses = [
    "Processing",
    "Transferred to delivery partner",
    "Shipping",
    "Received",
    "On the way",
    "Delivered",
  ];

  const refundStatus = ["Processing refund", "Refund Success"];

  const optionsArray = !refundStatus.includes(data?.status)
    ? statuses
    : refundStatus;

  return (
    <div className="min-h-screen bg-white py-6 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 border-b pb-3">
        <AiOutlineArrowLeft
          size={26}
          className="cursor-pointer text-[#2D6A4F] hover:text-[#FFD166]"
          onClick={() => navigate(-1)}
        />
        <BsFillBagFill size={26} className="text-[#FFD166]" />
        <h1 className="text-xl font-semibold text-gray-800">Order Details</h1>
      </div>

      {/* Order Info */}
      <div className="mt-4 text-sm text-gray-700 flex flex-wrap justify-between">
        <p>
          <span className="font-medium">Order ID:</span> #
          {data?._id?.slice(0, 8)}
        </p>
        <p>
          <span className="font-medium">Placed on:</span>{" "}
          {data?.createdAt?.slice(0, 10)}
        </p>
      </div>

      {/* Cart Items */}
      <div className="mt-5 space-y-3">
        {data &&
          data?.cart?.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 border rounded-lg p-3 bg-[#f9f9f9] hover:shadow-sm transition"
            >
              <img
                src={item.images?.[0]?.url}
                alt={item.name}
                className="w-[75px] h-[75px] object-cover rounded-md"
              />
              <div>
                <h5 className="text-gray-800 font-medium">{item.name}</h5>
                <p className="text-gray-600 text-sm">
                  ${item.discountPrice} x {item.qty}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Total Price */}
      <div className="border-t mt-5 pt-3 text-right text-sm">
        <span className="font-medium">Total Price:</span>{" "}
        <span className="text-[#2D6A4F] font-semibold">
          ${data?.totalPrice?.toFixed(2)}
        </span>
      </div>

      {/* Shipping + Payment Info */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-md bg-[#f9f9f9]">
          <h4 className="font-semibold mb-2 text-[#2D6A4F]">
            Shipping Address
          </h4>
          <p className="text-sm text-gray-600">
            {data?.shippingAddress.address1}, {data?.shippingAddress.city},{" "}
            {data?.shippingAddress.country}
          </p>
          <p className="text-sm text-gray-600">{data?.user?.phoneNumber}</p>
        </div>

        <div className="p-4 border rounded-md bg-[#f9f9f9]">
          <h4 className="font-semibold mb-2 text-[#2D6A4F]">Payment Info</h4>
          <p className="text-sm">
            Status:{" "}
            <span className="font-medium">
              {data?.paymentInfo?.status || "Not Paid"}
            </span>
          </p>
        </div>
      </div>

      {/* Order Status Update */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-3 text-[#2D6A4F]">
          Order Status
        </h4>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[220px] border h-[40px] rounded-md px-2 focus:ring-2 focus:ring-[#FFD166] outline-none"
        >
          {optionsArray
            .slice(optionsArray.indexOf(status || data?.status))
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>

        <button
          className={`mt-5 ml-2 px-5 py-2 rounded-md font-semibold transition-all duration-300 
            ${
              status === data?.status
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#2D6A4F] text-white hover:bg-[#1b4a32]"
            }`}
          onClick={
            status === data?.status
              ? null
              : !refundStatus.includes(data?.status)
              ? orderUpdateHandler
              : refundOrderUpdateHandler
          }
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
