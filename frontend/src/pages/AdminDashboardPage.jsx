import AdminHeader from "../components/Layout/AdminHeader.jsx";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar.jsx";
import AdminContent from "../components/Admin/AdminContent .jsx";
const AdminDashboardpage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="W-[80px] 800px:w-[330px]">
          <AdminSidebar active={1} />
        </div>
        <AdminContent />
      </div>
    </div>
  );
};

export default AdminDashboardpage;
