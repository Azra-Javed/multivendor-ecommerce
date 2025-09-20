const CartData = ({ orderData }) => {
  return (
    <>
      <div className="w-full bg-white rounded-md p-5 pb-8">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4] ">
            Subtotal:
          </h3>
          <h5 className="text-[18px] font-[600]">
            ${orderData?.subTotalPrice?.toFixed(2)}
          </h5>
        </div>

        <br />
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
          <h5 className="text-[18px] font-[600]">
            {(orderData?.shipping ?? 0).toFixed(2)}
          </h5>
        </div>

        <br />
        <div className="flex justify-between border-b border-[#d6d1d1] pb-3">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
          <h5 className="text-[18px] font-[600]">
            {orderData?.discountPrice ? "$" + orderData?.discountPrice : "-"}
          </h5>
        </div>

        <div className="text-[18px] font-[600] text-end pt-3">
          {orderData?.totalPrice?.toFixed(2)}
        </div>
      </div>
    </>
  );
};

export default CartData;
