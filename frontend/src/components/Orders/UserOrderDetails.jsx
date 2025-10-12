import { BsFillBagFill } from "react-icons/bs";
import { AiOutlineArrowLeft, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../redux/features/orderSlice";
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

      {/* Order info */}
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

      {/* Items */}
      <div className="mt-5 space-y-3">
        {data &&
          data?.cart?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border rounded-lg p-3 hover:shadow-sm transition bg-[#f9f9f9]"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item?.images?.[0]?.url}
                  alt=""
                  className="w-[65px] h-[65px] rounded-md object-cover"
                />
                <div>
                  <h5 className="font-medium text-gray-800">{item.name}</h5>
                  <p className="text-gray-600 text-sm">
                    ${item.discountPrice} x {item.qty}
                  </p>
                </div>
              </div>

              {!item.isReviewed && data?.status === "Delivered" && (
                <button
                  onClick={() => {
                    setOpen(true);
                    setSelectedItem(item);
                  }}
                  className="px-3 py-1.5 text-sm rounded-md bg-[#2D6A4F] text-white hover:bg-[#1b4a32]"
                >
                  Review
                </button>
              )}
            </div>
          ))}
      </div>

      {/* Review popup */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-[90%] md:w-[400px] bg-white rounded-lg p-5 relative shadow-lg">
            <RxCross1
              size={24}
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-700"
            />
            <h2 className="text-lg font-semibold mb-4 text-center">
              Write a Review
            </h2>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={selectedItem?.images?.[0]?.url}
                alt=""
                className="w-[60px] h-[60px] object-cover rounded-md"
              />
              <div>
                <h3 className="text-sm font-medium">{selectedItem?.name}</h3>
                <p className="text-xs text-gray-500">
                  ${selectedItem?.discountPrice} x {selectedItem?.qty}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-3 justify-center">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    color="#FFD166"
                    size={22}
                    onClick={() => setRating(i)}
                    className="cursor-pointer"
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    color="#FFD166"
                    size={22}
                    onClick={() => setRating(i)}
                    className="cursor-pointer"
                  />
                )
              )}
            </div>

            {/* Comment */}
            <textarea
              rows="3"
              placeholder="Share your experience..."
              className="w-full text-sm border rounded-md p-2 focus:ring-2 focus:ring-[#FFD166] outline-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              className="w-full mt-3 bg-[#2D6A4F] text-white py-2 rounded-md hover:bg-[#1b4a32]"
              onClick={rating > 1 && reviewHandler}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Total */}
      <div className="mt-5 text-right text-gray-700 text-sm">
        <span className="font-medium">Total:</span>{" "}
        <span className="text-[#2D6A4F] font-semibold">
          ${data?.totalPrice?.toFixed(2)}
        </span>
      </div>

      {/* Shipping + Payment */}
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
          {data?.status === "Delivered" && (
            <button
              className="mt-3 px-4 py-1.5 bg-[#FFD166] text-gray-800 text-sm rounded-md hover:bg-[#f5c14e]"
              onClick={refundHandler}
            >
              Request Refund
            </button>
          )}
        </div>
      </div>

      {/* Message Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => handleMessageSubmit(data.cart[0])}
          className="px-6 py-2 bg-[#2D6A4F] text-white rounded-md hover:bg-[#1b4a32]"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default UserOrderDetails;
