import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import CreateEvent from "../../components/Shop/Layout/CreateEvent.jsx";

const ShopCreateEvent = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="W-[80px] 800px:w-[330px]">
          <DashboardSidebar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <CreateEvent />
        </div>
      </div>
    </>
  );
};

export default ShopCreateEvent;
