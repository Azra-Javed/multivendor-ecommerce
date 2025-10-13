import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Layout/Loader";
import styles from "../../styles/style";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/features/productSlice";
import { server } from "../../server";

const ShopInfo = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const totalReviewsLength =
    products?.reduce((acc, product) => acc + product.reviews.length, 0) || 0;

  const totalRatings =
    products?.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    ) || 0;

  const averageRatings = totalRatings / totalReviewsLength || 0;

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  }, [dispatch, id]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${server}/shop/logoutShop`, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Logged out successfully");
      window.location.href = "/shop-login";
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-md mx-auto p-6 pt-3 space-y-6">
      {/* Shop Avatar & Name */}
      <div className="flex flex-col items-center">
        <img
          src={data?.avatar?.url || "/default-avatar.png"}
          alt={data.name}
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-200"
        />
        <h3 className="text-2xl font-semibold mt-3">{data.name}</h3>
        <p className="text-sm text-gray-600 text-center mt-2">
          {data?.description?.length > 60
            ? data.description.slice(0, 60) + "..."
            : data.description || "No description provided."}
        </p>
      </div>

      {/* Shop Details */}
      <div className="space-y-3 text-sm">
        <div>
          <h5 className="font-medium text-gray-700">Address</h5>
          <p className="text-gray-500">{data.address}</p>
        </div>
        <div>
          <h5 className="font-medium text-gray-700">Phone Number</h5>
          <p className="text-gray-500">{data.phoneNumber}</p>
        </div>
        <div>
          <h5 className="font-medium text-gray-700">Total Products</h5>
          <p className="text-gray-500">{products?.length}</p>
        </div>
        <div>
          <h5 className="font-medium text-gray-700">Shop Ratings</h5>
          <p className="text-gray-500">{averageRatings.toFixed(1)}/5</p>
        </div>
        <div>
          <h5 className="font-medium text-gray-700">Joined On</h5>
          <p className="text-gray-500">{data?.createdAt?.slice(0, 10)}</p>
        </div>
      </div>

      {/* Owner Actions */}
      {isOwner && (
        <div className="space-y-2">
          <Link
            className={`${styles.button} !w-full !h-[44px] !rounded-md text-white`}
            to="/settings"
          >
            Edit Shop
          </Link>
          <button
            onClick={logoutHandler}
            className={`${styles.button} !w-full !h-[44px] !rounded-md text-white`}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
