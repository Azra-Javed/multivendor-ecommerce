import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { IoBagHandleOutline } from "react-icons/io5";
import { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

const Wishlist = ({ setOpenWishlist }) => {
  const listData = [
    {
      name: "Samsung Galaxy S23 Ultra 512GB SSD and 12GB RAM Phantom Black",
      description:
        "Flagship Android phone with powerful camera and performance",
      price: 1199,
    },
    {
      name: "MacBook Air M2 256GB SSD and 8GB RAM Space Gray",
      description: "Lightweight and powerful laptop with M2 chip",
      price: 999,
    },
    {
      name: "Dell XPS 15 1TB SSD and 16GB RAM Silver",
      description: "High-end Windows laptop for creators and professionals",
      price: 1499,
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
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
            <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
          </div>

          {/* cart single items */}
          <br />
          <div className="w-full border-t">
            {listData.map((i, index) => (
              <CartSingle key={index} data={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer" />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdx2jNeW45bTh7g9qYUReNrje4TrAZ6A2FA&s"
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-family-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
          />
        </div>
      </div>
    </div>
  );
};
export default Wishlist;
