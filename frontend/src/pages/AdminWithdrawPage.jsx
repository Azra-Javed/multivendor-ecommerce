import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminAllWithdraw from "../components/Admin/AdminAllWithdraw.jsx";
const AdminWithdrawPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="W-[80px] 800px:w-[330px]">
          <AdminSidebar active={7} />
        </div>
        <AdminAllWithdraw />
      </div>
    </div>
  );
};

export default AdminWithdrawPage;
