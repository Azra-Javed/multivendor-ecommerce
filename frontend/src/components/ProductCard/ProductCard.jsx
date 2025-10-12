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
import { BsStarFill } from "react-icons/bs";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) toast.error("Item already in cart");
    else if (data.stock < 1) toast.error("Product stock limited");
    else {
      dispatch(addToCart({ ...data, qty: 1 }));
      toast.success("Item added to cart successfully!");
    }
  };

  const handleToggleWishlist = () => {
    if (click) {
      dispatch(removeFromWishlist(data._id));
      toast.info("Removed from wishlist!");
    } else {
      dispatch(addToWishlist(data));
      toast.success("Added to wishlist!");
    }
    setClick(!click);
  };

  useEffect(() => {
    setClick(wishlist?.some((i) => i._id === data._id));
  }, [wishlist, data._id]);

  // Helper component for the action icons with white circular background
  const ActionIcon = ({ children, onClick, title }) => (
    <div
      className="w-8 h-8 rounded-full bg-white shadow shadow-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={onClick}
      title={title}
    >
      {children}
    </div>
  );

  return (
    <div className="group relative w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
      {/* ===== Action Buttons ===== */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ActionIcon
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          title="Quick view"
        >
          <AiOutlineEye size={18} color="#2D6A4F" />
        </ActionIcon>

        <ActionIcon onClick={handleToggleWishlist}>
          {click ? (
            <AiFillHeart
              size={18}
              color="#FF4B4B"
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart size={18} color="#2D6A4F" title="Add to wishlist" />
          )}
        </ActionIcon>

        <ActionIcon onClick={() => addToCartHandler(data._id)}>
          <AiOutlineShoppingCart
            size={18}
            color="#2D6A4F"
            title="Add to cart"
          />
        </ActionIcon>
      </div>

      {/* ===== Product Image ===== */}
      <Link
        to={
          isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
        }
      >
        <div className="relative flex items-center justify-center h-[250px] w-full overflow-hidden bg-[#f9f9f9]">
          <img
            src={
              data.images?.[0]?.url ||
              "https://via.placeholder.com/300x400.png?text=Product+Image"
            }
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />

          {/* Small “Sale” badge if applicable */}
          {data.discountPrice && (
            <span className="absolute top-3 left-3 bg-[#FFD166] text-[#2D6A4F] text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
              Sale
            </span>
          )}
        </div>
      </Link>

      {/* ===== Product Info ===== */}
      <div className="p-5">
        {/* Name + Rating */}
        <div className="flex justify-between items-start mb-3">
          <h2
            className="text-[18px] font-semibold text-gray-800 leading-tight line-clamp-2 group-hover:text-[#2D6A4F] transition-colors"
            title={data.name}
          >
            {data.name}
          </h2>

          <div className="flex items-center text-sm font-semibold text-[#2D6A4F] shrink-0 ml-2">
            <BsStarFill size={16} className="text-[#FFD166] mr-1" />
            <span className="text-[15px]">
              {data.ratings ? data.ratings.toFixed(1) : "4.5"}
            </span>
          </div>
        </div>

        {/* Price Display */}
        <div className="mt-3 flex items-baseline  space-x-2">
          {data.originalPrice && (
            <span className="text-[15px] text-gray-400 line-through">
              ${data.originalPrice.toFixed(2)}
            </span>
          )}
          <h3 className="text-[22px] font-bold text-[#2D6A4F]">
            ${(data.discountPrice || data.originalPrice)?.toFixed(2) || "XX.XX"}
          </h3>
        </div>
      </div>

      {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
    </div>
  );
};

export default ProductCard;
