import AdminSellers from "../components/Admin/AdminSellers";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AdminHeader from "../components/Layout/AdminHeader";

const AdminUsersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="W-[80px] 800px:w-[330px]">
          <AdminSidebar active={3} />
        </div>
        <AdminSellers />
      </div>
    </div>
  );
};

export default AdminUsersPage;
