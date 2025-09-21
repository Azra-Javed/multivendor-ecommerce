import styles from "../../styles/style";

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentage,
}) => {
  return (
    <>
      <div className="w-full bg-white rounded-md p-5 pb-8">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4] ">
            Subtotal:
          </h3>
          <h5 className="text-[18px] font-[600]">
            ${subTotalPrice.toFixed(2)}
          </h5>
        </div>

        <br />
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
          <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
        </div>

        <br />
        <div className="flex justify-between border-b border-[#d6d1d1] pb-3">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
          <h5 className="text-[18px] font-[600]">
            - {discountPercentage ? "$" + discountPercentage : ""}
          </h5>
        </div>

        <div className="text-[18px] font-[600] text-end pt-3">
          ${totalPrice.toFixed(2)}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={`${styles.input} h-[40px] pl-2 mt-5`}
            placeholder="Coupon code"
            required
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <input
            className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
            required
            value="Apply code"
            type="submit"
          />
        </form>
      </div>
    </>
  );
};

export default CartData;
