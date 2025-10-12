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
    <div className="w-full  bg-white shadow-xl  rounded-md p-5 pb-8">
      {/* Subtotal */}
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#2D6A4F]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600] text-[#2D6A4F]">
          ${subTotalPrice.toFixed(2)}
        </h5>
      </div>

      <br />
      {/* Shipping */}
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#2D6A4F]">Shipping:</h3>
        <h5 className="text-[18px] font-[600] text-[#2D6A4F]">
          ${shipping.toFixed(2)}
        </h5>
      </div>

      <br />
      {/* Discount */}
      <div className="flex justify-between border-b border-[#2D6A4F] pb-3">
        <h3 className="text-[16px] font-[400] text-[#2D6A4F]">Discount:</h3>
        <h5 className="text-[18px] font-[600] text-[#2D6A4F]">
          - {discountPercentage ? "$" + discountPercentage : "0"}
        </h5>
      </div>

      {/* Total */}
      <div className="text-[18px] font-[600] text-end pt-3 text-[#2D6A4F]">
        ${totalPrice.toFixed(2)}
      </div>

      {/* Coupon form */}
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
          type="submit"
          value="Apply code"
          className="w-full h-[40px] bg-[#2D6A4F] text-white rounded-[3px] mt-5 cursor-pointer hover:bg-[#1B4332] transition"
        />
      </form>
    </div>
  );
};

export default CartData;
