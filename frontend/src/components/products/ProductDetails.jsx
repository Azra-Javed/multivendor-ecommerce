import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { addToCart } from "../../redux/features/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/features/wishlistSlice";
import { getAllProductsShop } from "../../redux/features/productSlice";
import Ratings from "./Ratings";
import styles from "../../styles/style";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.shop?._id) {
      dispatch(getAllProductsShop(data.shop._id));
    }
    setClick(!!wishlist?.find((i) => i._id === data?._id));
  }, [dispatch, data, wishlist]);

  const incrementCount = () => setCount((prev) => prev + 1);
  const decrementCount = () => count > 1 && setCount((prev) => prev - 1);

  const addToCartHandler = (id) => {
    if (cart.find((i) => i._id === id)) {
      return toast.error("Item already in cart");
    }
    if (data.stock < count) {
      return toast.error("Stock is limited");
    }
    dispatch(addToCart({ ...data, qty: count }));
    toast.success("Added to cart successfully!");
  };

  const toggleWishlist = () => {
    setClick(!click);
    if (click) {
      dispatch(removeFromWishlist(data._id));
    } else {
      dispatch(addToWishlist(data));
    }
  };

  const totalReviewsLength = products?.reduce(
    (acc, p) => acc + (p.reviews?.length || 0),
    0
  );
  const totalRatings = products?.reduce(
    (acc, p) => acc + (p.reviews?.reduce((sum, r) => sum + r.rating, 0) || 0),
    0
  );
  const averageRatings =
    totalReviewsLength > 0 ? totalRatings / totalReviewsLength : 0;

  return (
    <div className={`${styles.section} w-[90%] max-w-[80rem] mx-auto py-10`}>
      {data && (
        <>
          {/* Product Section */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT: Product Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Title + Wishlist */}
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-semibold text-[#1B4332]">
                    {data.name}
                  </h1>
                  <button onClick={toggleWishlist}>
                    {click ? (
                      <AiFillHeart
                        size={28}
                        className="text-[#FF3B3B] hover:scale-110 transition"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={28}
                        className="text-gray-600 hover:text-[#2D6A4F] transition"
                      />
                    )}
                  </button>
                </div>

                {/* Description */}
                <p className="mt-3 text-gray-600 leading-relaxed max-h-[12rem] overflow-hidden line-clamp-6">
                  {data?.description}
                </p>

                {/* Price */}
                <div className="flex justify-end mt-4">
                  <h4 className="text-2xl font-bold text-[#2D6A4F]">
                    ${data.discountPrice}
                  </h4>
                  {data.originalPrice && (
                    <span className="text-gray-400 line-through ml-2">
                      ${data.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Shop Info + Add to Cart */}
              <div className="mt-6 flex justify-between items-center">
                <Link
                  to={`/shop/preview/${data?.shop._id}`}
                  className="flex items-center"
                >
                  <img
                    src={data?.shop?.avatar?.url}
                    alt="shop"
                    className="w-12 h-12 rounded-full border border-[#E3F1E5] mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-[#1B4332]">
                      {data.shop.name}
                    </h3>
                    <p className="text-sm text-gray-500">(4/5) Ratings</p>
                  </div>
                </Link>

                <button
                  className="bg-gradient-to-r from-green-600 to-yellow-400 hover:opacity-90 text-white rounded-lg px-5 py-2 flex items-center shadow-md transition"
                  onClick={() => addToCartHandler(data._id)}
                >
                  Add to cart
                  <AiOutlineShoppingCart className="ml-2 text-lg" />
                </button>
              </div>

              {/* Quantity Controls */}
              <div className="mt-6 flex justify-center">
                <div className="inline-flex items-center rounded-lg overflow-hidden shadow">
                  <button
                    onClick={decrementCount}
                    className="bg-[#2D6A4F] text-white font-bold px-4 py-2 hover:bg-[#1B4332] transition"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 bg-gray-100 text-gray-800 font-semibold">
                    {count}
                  </span>
                  <button
                    onClick={incrementCount}
                    className="bg-[#2D6A4F] text-white font-bold px-4 py-2 hover:bg-[#1B4332] transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Product Image */}
            <div className="flex-1 flex flex-col items-center">
              <img
                src={data?.images?.[select]?.url}
                alt="product"
                className="w-full max-w-[16rem] h-[16rem] object-contain rounded-lg shadow-md border border-[#E3F1E5] bg-white"
              />
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {data?.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img?.url}
                    alt=""
                    className={`h-16 w-16 object-cover rounded-lg cursor-pointer transition border-2 ${
                      select === idx
                        ? "border-green-600 scale-105"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    onClick={() => setSelect(idx)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRatings={averageRatings}
          />
        </>
      )}
    </div>
  );
};

// ---------- Product Details Info ----------
const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRatings,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#F6FFF7] rounded-xl mt-10 p-5 border border-[#E3F1E5]">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 border-b pb-3 text-center">
        {["Product Details", "Product Reviews", "Seller Info"].map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i + 1)}
            className={`font-semibold text-base sm:text-lg transition pb-1 ${
              active === i + 1
                ? "text-[#2D6A4F] border-b-2 border-[#2D6A4F]"
                : "text-gray-500 hover:text-[#2D6A4F]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Details */}
      {active === 1 && (
        <p className="mt-5 text-gray-700 leading-7 whitespace-pre-line text-sm sm:text-base">
          {data?.description}
        </p>
      )}

      {/* Product Reviews */}
      {active === 2 && (
        <div className="mt-5 space-y-4 max-h-[50vh] overflow-y-auto">
          {data?.reviews?.length > 0 ? (
            data.reviews.map((r, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row gap-3 items-start border-b pb-3"
              >
                <img
                  src={r?.user?.avatar?.url}
                  className="h-12 w-12 rounded-full"
                  alt="reviewer"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-[#1B4332]">
                    {r?.user?.name}
                  </h4>
                  <Ratings rating={r?.rating} />
                  <p className="text-gray-600 mt-1 text-sm">{r?.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-5 text-sm sm:text-base">
              No reviews yet 💤
            </p>
          )}
        </div>
      )}

      {/* Seller Info */}
      {active === 3 && (
        <div className="mt-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left section */}
          <div className="flex items-start sm:items-center flex-col sm:flex-row">
            <img
              src={data?.shop?.avatar?.url}
              alt="shop"
              className="w-14 h-14 rounded-full mb-3 sm:mb-0 sm:mr-3"
            />
            <div>
              <h3 className="font-semibold text-[#1B4332] text-base sm:text-lg">
                {data.shop.name}
              </h3>
              <p className="text-gray-500 text-sm">
                {averageRatings}/5 Ratings
              </p>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {data.shop?.description}
              </p>
            </div>
          </div>

          {/* Right section */}
          <div className="text-left sm:text-right">
            <p className="text-sm sm:text-base">
              <span className="font-semibold">Joined:</span>{" "}
              {data.shop?.createdAt?.slice(0, 10)}
            </p>
            <p className="text-sm sm:text-base">
              <span className="font-semibold">Total Products:</span>{" "}
              {products?.length}
            </p>
            <p className="text-sm sm:text-base">
              <span className="font-semibold">Total Reviews:</span>{" "}
              {totalReviewsLength}
            </p>
            <Link to={`/shop/${data?.shop._id}`}>
              <button className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-md mt-3 px-4 py-2 text-sm sm:text-base transition w-full sm:w-auto">
                Visit Shop
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
