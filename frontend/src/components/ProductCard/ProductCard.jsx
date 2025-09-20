import { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductDetailsCard from "./productDetailsCard";

import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/features/wishlistSlice";
import Ratings from "../products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);

    if (isItemExists) {
      toast.error("Item already in cart");
    } else {
      if (data.stock < 1) {
        toast.error("product stock limited");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data._id));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 relative cursor-pointer p-4">
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <img
            src={data.images && data?.images?.[0]?.url}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          {/* Product Name */}
          <h4 className="mt-3 mb-4 text-lg font-semibold text-gray-800 group-hover:text-teal-600 line-clamp-2">
            {data.name.length > 20 ? data.name.slice(0, 20) + "..." : data.name}
          </h4>

          {/* Price & Sold Info */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-baseline gap-2">
              <h5 className="text-xl font-bold text-teal-600">
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                $
              </h5>
              {data.originalPrice ? (
                <h4 className="text-sm line-through text-gray-400">
                  {data.originalPrice}$
                </h4>
              ) : null}
            </div>
            <div className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-lg">
              {data.sold_out} Sold
            </div>
          </div>

          {/* Ratings */}
          <div className="flex justify-center mt-5">
            <Ratings rating={data?.ratings} />
          </div>
        </Link>

        {/* side options */}

        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}

          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!click)}
            color="#333"
            title="Quick view"
          />

          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            color="#444"
            title="Add to cart"
            onClick={() => addToCartHandler(data._id)}
          />

          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
