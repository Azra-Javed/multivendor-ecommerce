import AdminEvents from "../components/Admin/AdminEvents.jsx";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AdminHeader from "../components/Layout/AdminHeader";

const AdminEventsPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="W-[80px] 800px:w-[330px]">
          <AdminSidebar active={6} />
        </div>
        <AdminEvents />
      </div>
    </div>
  );
};

export default AdminEventsPage;
