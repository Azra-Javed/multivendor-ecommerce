import styles from "../../styles/style";

const CartData = ({ orderData }) => {
  return (
    <div className="w-full  bg-white shadow-xl  rounded-md p-5 pb-8">
      {/* Subtotal */}
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#2D6A4F]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600] text-[#2D6A4F]">
          ${orderData?.subTotalPrice?.toFixed(2)}
        </h5>
      </div>

      <br />
      {/* Shipping */}
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#2D6A4F]">Shipping:</h3>
        <h5 className="text-[18px] font-[600] text-[#2D6A4F]">
          {(orderData?.shipping ?? 0).toFixed(2)}
        </h5>
      </div>

      <br />
      {/* Discount */}
      <div className="flex justify-between border-b border-[#2D6A4F] pb-3">
        <h3 className="text-[16px] font-[400] text-[#2D6A4F]">Discount:</h3>
        <h5 className="text-[18px] font-[600] text-[#2D6A4F]">
          - {orderData?.discountPrice ? "$" + orderData?.discountPrice : "-"}
        </h5>
      </div>

      {/* Total */}
      <div className="text-[18px] font-[600] text-end pt-3 text-[#2D6A4F]">
        {orderData?.totalPrice?.toFixed(2)}
      </div>
    </div>
  );
};

export default CartData;
