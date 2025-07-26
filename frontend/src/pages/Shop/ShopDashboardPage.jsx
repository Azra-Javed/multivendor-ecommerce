import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar.jsx";
const ShopDashboardPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="W-[80px] 800px:w-[330px]">
          <DashboardSidebar active={1} />
        </div>
      </div>
    </>
  );
};

export default ShopDashboardPage;
