import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/features/productSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/features/wishlistSlice";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Ratings from "./Ratings";
import axios from "axios";
import { server } from "../../server";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.shop?._id) {
      dispatch(getAllProductsShop(data.shop._id));
    }

    if (data?._id && wishlist?.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [dispatch, data, wishlist]);

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleMessageSubmit = async (e) => {
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

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);

    if (isItemExists) {
      toast.error("Item already in cart");
    } else {
      if (data.stock < count) {
        toast.error("product stock limited");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data._id));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews?.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRatings = totalRatings / totalReviewsLength || 0;

  return (
    <div>
      {data ? (
        <div
          className={`unset ${styles.section} w-[90%] max-w-[80rem] mx-auto`}
        >
          <div className="w-full py-6">
            <div className="flex flex-col-reverse lg:flex-row justify-between gap-10 py-6">
              {/* LEFT SIDE */}
              <div className="w-full lg:w-1/2 pt-5">
                {/* Title + Wishlist */}
                <div className="flex justify-between items-start">
                  <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                  {click ? (
                    <AiFillHeart
                      size="1.8rem"
                      className="cursor-pointer"
                      onClick={() => removeFromWishlistHandler(data)}
                      color="red"
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size="1.8rem"
                      className="cursor-pointer"
                      onClick={() => addToWishlistHandler(data)}
                      color="#333"
                      title="Add to wishlist"
                    />
                  )}
                </div>

                {/* Description */}
                <p className="max-h-[12rem] overflow-hidden line-clamp-6 text-base leading-relaxed mt-3">
                  {data.description}
                </p>

                {/* Prices */}
                <div className="flex justify-end pt-4">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  {data.originalPrice && (
                    <h3 className={`${styles.price}`}>{data.originalPrice}$</h3>
                  )}
                </div>

                {/* Shop Info + Cart Btn */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <img
                        src={data?.shop?.avatar?.url}
                        alt="shop avatar"
                        className="w-12 h-12 rounded-full mr-3"
                      />
                    </Link>
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <div>
                        <h3 className={`${styles.shop_name} leading-snug`}>
                          {data.shop.name}
                        </h3>
                        <h5 className="text-sm text-gray-500">(4/5) Ratings</h5>
                      </div>
                    </Link>
                  </div>

                  <button
                    className={`${styles.button} mt-4 rounded-lg h-11 px-6 flex items-center`}
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <span className="text-white flex items-center text-sm font-medium">
                      Add to cart <AiOutlineShoppingCart className="ml-2" />
                    </span>
                  </button>
                </div>

                {/* Quantity Controls */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center shadow-lg rounded-lg overflow-hidden">
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold px-4 py-2 hover:opacity-80 transition"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="text-gray-800 bg-gray-100 font-bold px-6 py-2 text-base">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold px-4 py-2 hover:opacity-80 transition"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              {/* RIGHT SIDE */}
              <div className="w-full lg:w-1/2">
                <div className="flex flex-col items-center">
                  <img
                    src={data?.images?.[select]?.url}
                    alt="product"
                    className="w-[90%] max-w-[28rem] h-auto object-contain rounded-2xl"
                  />
                  <div className="flex flex-wrap justify-center gap-4 mt-6">
                    {data?.images?.map((image, index) => (
                      <div
                        key={index}
                        className={`${
                          select === index
                            ? "border-2 border-blue-900 rounded-2xl"
                            : ""
                        } cursor-pointer`}
                      >
                        <img
                          src={image?.url}
                          alt=""
                          className="h-28 w-28 object-contain rounded-2xl"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product details info */}
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRatings={averageRatings}
          />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRatings,
}) => {
  const [active, setActive] = useState(1);

  return (
    <>
      <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
        <div className="w-full flex justify-between border-b pt-10 pb-2">
          {/* product details */}
          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(1)}
            >
              Product Details
            </h5>
            {active === 1 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </div>

          {/* reviews */}
          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(2)}
            >
              Product Reviews
            </h5>
            {active === 2 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </div>

          {/* seller information */}
          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(3)}
            >
              Seller Information
            </h5>
            {active === 3 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </div>
        </div>

        {active === 1 ? (
          <>
            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
              {data.description}
            </p>
          </>
        ) : null}
        {active === 2 ? (
          <div className="w-full py-4 min-h-[40vh] flex flex-col items-center overflow-y-auto">
            {data &&
              data?.reviews?.map((item, index) => (
                <div className="w-full flex my-2">
                  <img
                    src={item?.user?.avatar?.url}
                    className="h-[50px] w-[50px] rounded-full"
                  />
                  <div className="pl-2">
                    <div className="w-full flex items-center">
                      <h1 className="font-[500] mr-3">{item?.user?.name}</h1>
                      <Ratings rating={data?.ratings} />
                    </div>
                    <p>{item?.comment}</p>
                  </div>
                </div>
              ))}
            <div
              className="
            flex !items-center justify-center"
            >
              {data && data?.reviews?.length === 0 && <h5>No reviews yet</h5>}
            </div>
          </div>
        ) : null}

        {active === 3 && (
          <div className="w-full block 800px:flex p-5">
            {/* shop info*/}
            <div className="w-full 800px:w-[50%]">
              <div className="flex items-center">
                <Link to={`/shop/preview/${data.shop._id}`}>
                  {" "}
                  <img
                    src={data?.shop?.avatar?.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-3"
                  />
                </Link>

                <div>
                  <Link to={`/shop/preview/${data.shop._id}`}>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  </Link>

                  <h5 className="pb-3 text-[15px]">
                    {averageRatings}/5 Ratings
                  </h5>
                </div>
              </div>

              <p className="pt-2">{data.shop.description}</p>
            </div>
            {/* seller */}
            <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end ">
              <div className="text-left">
                <h5 className="font-[600]">
                  Joined on:{" "}
                  <span className="font-[500] ">
                    {data.shop?.createdAt?.slice(0, 10)}
                  </span>
                </h5>
                <h5 className="font-[600]">
                  Total Products:{" "}
                  <span className="font-[500] ">
                    {products && products.length}
                  </span>
                </h5>
                <h5 className="font-[600]">
                  Total Reviews:{" "}
                  <span className="font-[500] ">{totalReviewsLength}</span>
                </h5>
                <Link to={`/shop/${data?.shop._id}`}>
                  <div
                    className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                  >
                    <h4 className="text-white">Visit Shop</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
