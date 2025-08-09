import styles from "../../styles/style";
import ShippingInfo from "../Checkout/ShippingInfo.jsx";
import CartData from "../Checkout/CartData.jsx";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const paymentSubmit = () => {
    navigate("/payment");
  };

  return (
    <>
      <div className="w-full flex flex-col items-center py-8">
        <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
          <div className="w-full 800px:w-[65%]">
            <ShippingInfo />
          </div>

          <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
            <CartData />
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
