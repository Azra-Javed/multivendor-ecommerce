import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getShopAllOrders } from "../../redux/features/orderSlice";
import { server } from "../../server";
import styles from "../../styles/style";

const OrderDetails = () => {
  const { shopOrders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
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
    <div className={`py-6 min-h-screen ${styles.section}`}>
      {/* Header */}
      <div className="w-full flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <BsFillBagFill size={32} className="text-[#E94560]" />
          <h1 className="text-2xl font-semibold text-gray-800">
            Order Details
          </h1>
        </div>
        <Link to="/dashboard-orders">
          <button
            className="px-5 py-2 rounded-md bg-[#FCE1E6] text-[#E94560] font-semibold 
                       hover:bg-[#E94560] hover:text-white transition-all duration-300"
          >
            Order List
          </button>
        </Link>
      </div>

      {/* Order Info */}
      <div className="w-full flex items-center justify-between pt-6 text-gray-600">
        <h5>
          Order ID:{" "}
          <span className="font-medium text-gray-800">
            #{data?._id?.slice(0, 8)}
          </span>
        </h5>
        <h5>
          Placed on:{" "}
          <span className="font-medium text-gray-800">
            {data?.createdAt?.slice(0, 10)}
          </span>
        </h5>
      </div>

      {/* Cart Items */}
      <div className="mt-6 space-y-4">
        {data &&
          data?.cart?.map((item, index) => (
            <div
              key={index}
              className="w-full flex items-start gap-4 bg-white shadow-sm p-4 rounded-md"
            >
              <img
                src={item.images?.[0]?.url}
                alt={item.name}
                className="w-[90px] h-[90px] object-cover rounded-md"
              />
              <div className="flex flex-col">
                <h5 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h5>
                <p className="text-gray-600 mt-1">
                  US${item.discountPrice} x {item.qty}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Total */}
      <div className="border-t mt-6 pt-4 text-right">
        <h5 className="text-lg font-semibold">
          Total Price:{" "}
          <span className="text-[#E94560]">
            US$ {data?.totalPrice?.toFixed(2)}
          </span>
        </h5>
      </div>

      {/* Shipping + Payment */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm p-5 rounded-md">
          <h4 className="text-xl font-semibold mb-2">Shipping Address</h4>
          <p>
            {data?.shippingAddress.address1} {data?.shippingAddress.address2}
          </p>
          <p>{data?.shippingAddress?.country}</p>
          <p>{data?.shippingAddress?.city}</p>
          <p>{data?.user?.phoneNumber}</p>
        </div>
        <div className="bg-white shadow-sm p-5 rounded-md">
          <h4 className="text-xl font-semibold mb-2">Payment Info</h4>
          <p>
            Status:{" "}
            <span className="font-medium text-gray-800">
              {data?.paymentInfo?.status
                ? data?.paymentInfo.status
                : "Not Paid"}
            </span>
          </p>
        </div>
      </div>

      {/* Order Status */}
      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-3">Order Status</h4>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[220px] border h-[40px] rounded-md px-2 focus:ring-2 focus:ring-[#E94560]"
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
          className={`mt-5 px-5 py-2 rounded-md font-semibold transition-all duration-300 
            ${
              status === data?.status
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#FCE1E6] text-[#E94560] hover:bg-[#E94560] hover:text-white"
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
