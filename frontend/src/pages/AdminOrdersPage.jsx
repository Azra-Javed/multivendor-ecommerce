import AdminOrders from "../components/Admin/AdminOrders.jsx";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AdminHeader from "../components/Layout/AdminHeader";

const AdminOrderspage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="">
          <AdminSidebar active={2} />
        </div>
        <AdminOrders />
      </div>
    </div>
  );
};

export default AdminOrderspage;
