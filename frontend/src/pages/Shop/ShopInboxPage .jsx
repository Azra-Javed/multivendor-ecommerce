import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import DashboardMessages from "../../components/Shop/DashboardMessages.jsx";

const ShopInboxPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="W-[80px] 800px:w-[330px]">
          <DashboardSidebar active={8} />
        </div>

        <DashboardMessages />
      </div>
    </>
  );
};

export default ShopInboxPage;
