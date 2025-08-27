import styles from "../../styles/style";
import ShippingInfo from "../Checkout/ShippingInfo.jsx";
import CartData from "../Checkout/CartData.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { server } from "../../server.js";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [country, setCountry] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const shipping = subTotalPrice * 0.1;

  const discountPercentage = couponCodeData ? discountPrice : "";

  const totalPrice = subTotalPrice + shipping - discountPercentage;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = couponCode;

    try {
      const res = await axios.get(`${server}/coupon/get-coupon-value/${name}`);
      const coupon = res?.data?.couponCode;

      if (!coupon) {
        toast.error("Coupon code doesn't exist!");
        setCouponCode("");
        return;
      }

      const shopId = coupon.shopId;
      const couponCodeValue = coupon.value;

      const isCouponValid = Array.isArray(cart)
        ? cart.filter((item) => item.shopId === shopId)
        : [];

      if (isCouponValid.length === 0) {
        toast.error("Coupon code is not valid for this shop");
        return;
      }

      const eligiblePrice = isCouponValid.reduce(
        (acc, item) => acc + item.qty * item.discountPrice,
        0
      );

      const discountPrice = (eligiblePrice * couponCodeValue) / 100;

      setDiscountPrice(discountPrice);
      setCouponCodeData(res.data.couponCode);
      toast.success("Coupon applied successfully!");
      setCouponCode("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to apply coupon. Please try again!");
    }
  };

  const paymentSubmit = () => {
    if (
      address1 == "" ||
      address2 == "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Delivery address is required to place your order.");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      // update local storage with updated order arrays
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="w-full flex flex-col items-center py-8">
        <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
          <div className="w-full 800px:w-[65%]">
            <ShippingInfo
              user={user}
              address1={address1}
              address2={address2}
              city={city}
              country={country}
              zipCode={zipCode}
              setAddress1={setAddress1}
              setAddress2={setAddress2}
              setZipCode={setZipCode}
              setCity={setCity}
              setCountry={setCountry}
            />
          </div>

          <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
            <CartData
              handleSubmit={handleSubmit}
              totalPrice={totalPrice}
              shipping={shipping}
              subTotalPrice={subTotalPrice}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              discountPercentage={discountPercentage}
            />
          </div>
        </div>

        <div
          className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
          onClick={paymentSubmit}
        >
          <h5 className="text-white">Go to payment</h5>
        </div>
      </div>
    </>
  );
};

export default Checkout;
