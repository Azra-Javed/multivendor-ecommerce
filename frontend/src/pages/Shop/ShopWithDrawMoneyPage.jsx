import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar.jsx";
import WithdrawMoney from "../../components/Shop/WithdrawMoney.jsx";

const ShopWithDrawMoneyPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="W-[80px] 800px:w-[330px]">
          <DashboardSidebar active={7} />
        </div>
        <WithdrawMoney />
      </div>
    </>
  );
};

export default ShopWithDrawMoneyPage;
