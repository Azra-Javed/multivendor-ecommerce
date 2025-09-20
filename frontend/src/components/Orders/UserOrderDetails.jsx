import { BsFillBagFill } from "react-icons/bs";
import styles from "../../styles/style";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../redux/features/orderSlice";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrders(user?._id));
  }, [dispatch, user?._id]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async () => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrders(user?._id));
        setComment("");
        setRating(1);
        setOpen(false);
      })
      .catch((error) => toast.error(error?.response?.data?.message));
  };

  const refundHandler = async () => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrders(user?._id));
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  const handleMessageSubmit = async (data) => {
    if (isAuthenticated) {
      const groupTitle = data?._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;

      await axios
        .post(`${server}/conversation/create-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to start conversation");
    }
  };

  return (
    <div className={`py-6 min-h-screen ${styles.section}`}>
      {/* Header */}
      <div className="flex items-center gap-2 border-b pb-4">
        <BsFillBagFill size={32} className="text-[#E94560]" />
        <h1 className="text-2xl font-semibold text-gray-800">Order Details</h1>
      </div>

      {/* Order info */}
      <div className="flex items-center justify-between mt-6 text-gray-600">
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

      {/* Cart items */}
      <div className="mt-6 space-y-4">
        {data &&
          data?.cart?.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between gap-4 bg-white shadow-sm rounded-md p-4"
            >
              <div className="flex gap-3">
                <img
                  src={item?.images?.[0]?.url}
                  alt=""
                  className="w-[80px] h-[80px] object-cover rounded-md"
                />
                <div>
                  <h5 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h5>
                  <p className="text-gray-600">
                    US${item.discountPrice} x {item.qty}
                  </p>
                </div>
              </div>

              {!item.isReviewed && data?.status === "Delivered" && (
                <button
                  className="px-4 py-2 bg-[#E94560] text-white rounded-md hover:bg-[#c9304d] transition"
                  onClick={() => {
                    setOpen(true);
                    setSelectedItem(item);
                  }}
                >
                  Write a Review
                </button>
              )}
            </div>
          ))}
      </div>

      {/* Review popup */}
      {open && (
        <div className="fixed inset-0 bg-[#85838396] bg-opacity-50 z-50 flex items-center justify-center">
          <div className="w-[90%] md:w-[50%] bg-white shadow-lg rounded-lg p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setOpen(false)}
            >
              <RxCross1 size={28} />
            </button>

            <h2 className="text-2xl font-semibold text-center mb-6">
              Give a Review
            </h2>

            {/* Product info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedItem?.images?.[0]?.url}
                alt=""
                className="w-[80px] h-[80px] rounded-md object-cover"
              />
              <div>
                <h3 className="text-lg font-medium">{selectedItem?.name}</h3>
                <p className="text-gray-600">
                  US${selectedItem?.discountPrice} x {selectedItem?.qty}
                </p>
              </div>
            </div>

            {/* Ratings */}
            <h5 className="text-lg font-medium mb-2">
              Give Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="cursor-pointer"
                    color="rgb(246,186,0)"
                    size={28}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="cursor-pointer"
                    color="rgb(246,186,0)"
                    size={28}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>

            {/* Comment */}
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                Write a Comment{" "}
                <span className="text-sm text-gray-500">(optional)</span>
              </label>
              <textarea
                rows="5"
                className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-[#E94560]"
                placeholder="How was your product? Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <button
              className="w-full py-2 bg-[#E94560] text-white rounded-md hover:bg-[#c9304d] transition"
              onClick={rating > 1 && reviewHandler}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Total */}
      <div className="border-t mt-6 pt-4 text-right">
        <h5 className="text-lg font-semibold">
          Total Price:{" "}
          <span className="text-[#E94560]">
            US$ {data?.totalPrice.toFixed(2)}
          </span>
        </h5>
      </div>

      {/* Shipping + Payment */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-md shadow-sm">
          <h4 className="text-xl font-semibold mb-2">Shipping Address</h4>
          <p>
            {data?.shippingAddress.address1} {data?.shippingAddress.address2}
          </p>
          <p>{data?.shippingAddress?.country}</p>
          <p>{data?.shippingAddress?.city}</p>
          <p>{data?.user?.phoneNumber}</p>
        </div>
        <div className="bg-white p-5 rounded-md shadow-sm">
          <h4 className="text-xl font-semibold mb-2">Payment Info</h4>
          <p>
            Status:{" "}
            <span className="font-medium text-gray-800">
              {data?.paymentInfo?.status
                ? data?.paymentInfo.status
                : "Not Paid"}
            </span>
          </p>
          {data?.status === "Delivered" && (
            <button
              className="mt-4 px-4 py-2 bg-[#E94560] text-white rounded-md hover:bg-[#c9304d] transition"
              onClick={refundHandler}
            >
              Request Refund
            </button>
          )}
        </div>
      </div>

      {/* Message Button */}
      <div className="mt-6">
        <button
          className="px-6 py-2 bg-[#E94560] text-white rounded-md hover:bg-[#c9304d] transition"
          onClick={() => handleMessageSubmit(data.cart[0])}
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default UserOrderDetails;
