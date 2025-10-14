import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar.jsx";
import DashboardContent from "../../components/Shop/DashboardContent.jsx";
const ShopDashboardPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="">
          <DashboardSidebar active={1} />
        </div>

        <DashboardContent />
      </div>
    </>
  );
};

export default ShopDashboardPage;
