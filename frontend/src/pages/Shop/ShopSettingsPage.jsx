import Footer from "../../components/Route/Footer";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar.jsx";
import ShopSetting from "../../components/Shop/ShopSetting.jsx";

const ShopSettingsPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="W-[80px] 800px:w-[330px]">
          <DashboardSidebar active={11} />
        </div>

        <ShopSetting />
      </div>
    </>
  );
};

export default ShopSettingsPage;
