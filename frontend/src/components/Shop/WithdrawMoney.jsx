import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopAllOrders } from "../../redux/features/orderSlice";
import { getAllProductsShop } from "../../redux/actions/product.actions";
import styles from "../../styles/style";

const WithdrawMoney = () => {
  const { shopOrders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const [deliveredOrder, setDeliveredOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopAllOrders(seller._id));

    const orderData =
      shopOrders && shopOrders.filter((item) => item.status === "Delivered");
    setDeliveredOrder(orderData);
  }, [dispatch]);

  const totalEarningWithoutDiscount =
    deliveredOrder &&
    deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);

  const serviceCharge = totalEarningWithoutDiscount * 0.1;
  const availableBalance =
    totalEarningWithoutDiscount - serviceCharge.toFixed(2);
  console.log(availableBalance);
  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] font-medium text-gray-600 mb-2">
          Available Balance
        </h5>
        <p className="text-3xl font-bold text-gray-900 mb-6">
          ${availableBalance}
        </p>

        <button
          className={`${styles.button} text-white  !h-[42px] rounded-lg transition-transform duration-200 hover:scale-105`}
        >
          Withdraw Money
        </button>
      </div>
    </div>
  );
};

export default WithdrawMoney;
