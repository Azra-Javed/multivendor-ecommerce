import { useState } from "react";
import styles from "../../styles/style";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";

const PaymentInfo = ({ user, paymentHandler, cashOnDeliveryHandler }) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8 shadow-sm border border-[#e5e7eb]">
      {/* Payment selection options */}
      <div>
        {/* 1. Pay with Debit/Credit Card */}
        <div
          className="flex items-center w-full pb-5 border-b border-[#eee] mb-3 cursor-pointer"
          onClick={() => setSelect(1)}
        >
          <div
            className={`w-[25px] h-[25px] rounded-full flex items-center justify-center border-[3px] ${
              select === 1 ? "border-[#2D6A4F]" : "border-[#ccc]"
            }`}
          >
            {select === 1 && (
              <div className="w-[12px] h-[12px] bg-[#2D6A4F] rounded-full" />
            )}
          </div>
          <h4 className="text-[17px] pl-3 font-[600] text-[#1f2937]">
            Pay with Debit / Credit Card
          </h4>
        </div>

        {select === 1 && (
          <div className="w-full pb-4 border-b border-[#eee]">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%] mr-3">
                  <label className="block pb-1 text-[#2D6A4F] font-medium">
                    Name on Card
                  </label>
                  <input
                    required
                    placeholder={user?.name || ""}
                    className={`${styles.input} w-[95%] border border-[#d1d5db] focus:border-[#2D6A4F]`}
                    value={user?.name || ""}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-1 text-[#2D6A4F] font-medium">
                    Expiry Date
                  </label>
                  <CardExpiryElement
                    className={`${styles.input} !h-[35px] !w-[95%] border border-[#d1d5db] focus:border-[#2D6A4F]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#374151",
                        },
                        "::placeholder": { color: "#9CA3AF" },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%] mr-3">
                  <label className="block pb-1 text-[#2D6A4F] font-medium">
                    Card Number
                  </label>
                  <CardNumberElement
                    className={`${styles.input} border border-[#d1d5db] focus:border-[#2D6A4F]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#374151",
                        },
                        "::placeholder": { color: "#9CA3AF" },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-1 text-[#2D6A4F] font-medium">
                    CVV
                  </label>
                  <CardCvcElement
                    className={`${styles.input} border border-[#d1d5db] focus:border-[#2D6A4F]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#374151",
                        },
                        "::placeholder": { color: "#9CA3AF" },
                      },
                    }}
                  />
                </div>
              </div>

              <input
                type="submit"
                value="Pay Now"
                className={`${styles.button} !bg-[#2D6A4F] hover:!bg-[#1B4332] text-white h-[45px] rounded-[5px] cursor-pointer text-[17px] font-[600] w-full mt-2 transition`}
              />
            </form>
          </div>
        )}

        {/* 2. Pay with PayPal */}
        <div
          className="flex items-center w-full pb-5 border-b border-[#eee] mb-3 cursor-pointer"
          onClick={() => setSelect(2)}
        >
          <div
            className={`w-[25px] h-[25px] rounded-full flex items-center justify-center border-[3px] ${
              select === 2 ? "border-[#2D6A4F]" : "border-[#ccc]"
            }`}
          >
            {select === 2 && (
              <div className="w-[12px] h-[12px] bg-[#2D6A4F] rounded-full" />
            )}
          </div>
          <h4 className="text-[17px] pl-3 font-[600] text-[#1f2937]">
            Pay with PayPal
          </h4>
        </div>

        {select === 2 && (
          <div className="w-full pb-4 border-b border-[#eee]">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-full">
                  <label className="block pb-1 text-[#2D6A4F] font-medium">
                    PayPal Email
                  </label>
                  <input
                    required
                    placeholder="example@email.com"
                    className={`${styles.input} border border-[#d1d5db] focus:border-[#2D6A4F]`}
                  />
                </div>
              </div>

              <input
                type="submit"
                value="Pay Now"
                className={`${styles.button} !bg-[#2D6A4F] hover:!bg-[#1B4332] text-white h-[45px] rounded-[5px] cursor-pointer text-[17px] font-[600] w-full transition`}
              />
            </form>
          </div>
        )}

        {/* 3. Cash on Delivery */}
        <div
          className="flex items-center w-full pb-5 cursor-pointer"
          onClick={() => setSelect(3)}
        >
          <div
            className={`w-[25px] h-[25px] rounded-full flex items-center justify-center border-[3px] ${
              select === 3 ? "border-[#2D6A4F]" : "border-[#ccc]"
            }`}
          >
            {select === 3 && (
              <div className="w-[12px] h-[12px] bg-[#2D6A4F] rounded-full" />
            )}
          </div>
          <h4 className="text-[17px] pl-3 font-[600] text-[#1f2937]">
            Cash on Delivery
          </h4>
        </div>

        {select === 3 && (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm Order"
                className={`${styles.button} !bg-[#FFD166] hover:!bg-[#FCD34D] text-[#2D6A4F] h-[45px] rounded-[5px] cursor-pointer text-[17px] font-[600] w-full transition`}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentInfo;
