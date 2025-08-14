import { use, useEffect, useState } from "react";
import PaymentInfo from "./PaymentInfo.jsx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  //on approve
  const onApprve = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.PaymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center py-8">
        <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
          <div className="w-full 800px:w-[65%]">
            <PaymentInfo
              user={user}
              open={open}
              setOpen={setOpen}
              onApprve={onApprve}
              // createOrder={createOrderd}
              // paymentHandler={paymentHandler}
              // cashOnDeliveryHandler={cashOnDeliveryHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
