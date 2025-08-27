import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import AllRefundOrders from "../../components/Shop/AllRefundOrders.jsx";

const ShopAllRefunds = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="W-[80px] 800px:w-[330px]">
          <DashboardSidebar active={10} />
        </div>
        <div className="w-full justify-center flex">
          <AllRefundOrders />
        </div>
      </div>
    </>
  );
};

export default ShopAllRefunds;
