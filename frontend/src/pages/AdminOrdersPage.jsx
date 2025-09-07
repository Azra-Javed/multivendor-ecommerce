import AdminOrders from "../components/Admin/AdminOrders.jsx";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AdminHeader from "../components/Layout/AdminHeader";

const AdminOrderspage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="W-[80px] 800px:w-[330px]">
          <AdminSidebar active={2} />
        </div>
        <AdminOrders />
      </div>
    </div>
  );
};

export default AdminOrderspage;
