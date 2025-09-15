import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/features/wishlistSlice";
import { backend_url } from "../../server";
import { addToCart } from "../../redux/features/cartSlice";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data._id));
  };

  const addToCartHandler = (data) => {
    const updatedData = { ...data, qty: 1 };
    dispatch(addToCart(updatedData));
    setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-screen w-[80%] 800px:w-[25%] bg-white flex flex-col shadow-sm overflow-y-auto">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className=" flex-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer "
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist is empty!</h5>
          </div>
        ) : (
          <div>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            {/* item length */}
            <div className={`${styles.noramlFlex} p-4`}>
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {wishlist.length} {wishlist.length > 1 ? "Items" : "Item"}
              </h5>
            </div>

            {/* wishlist single items */}
            <br />
            <div className="w-full border-t">
              {wishlist.map((i, index) => (
                <CartSingle
                  key={index}
                  data={i}
                  removeFromWishlistHandler={removeFromWishlistHandler}
                  addToCartHandler={addToCartHandler}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b !border-[#cfcece] p-4">
      <div className="w-full 800px:flex  items-center">
        <RxCross1
          className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
          onClick={() => removeFromWishlistHandler(data)}
        />
        <img
          src={`${backend_url}${data.images[0]}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] text-[#d02222] pt-3 800px:pt-[3px] font-family-Roboto">
            USD${totalPrice}
          </h4>
        </div>

        <BsCartPlus
          size={20}
          className="cursor-pointer ml-auto"
          title="Add to cart"
          onClick={() => addToCartHandler(data)}
        />
      </div>
    </div>
  );
};
export default Wishlist;
