import AdminUsers from "../components/Admin/AdminUsers";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AdminHeader from "../components/Layout/AdminHeader";

const AdminUsersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="">
          <AdminSidebar active={4} />
        </div>
        <AdminUsers />
      </div>
    </div>
  );
};

export default AdminUsersPage;
