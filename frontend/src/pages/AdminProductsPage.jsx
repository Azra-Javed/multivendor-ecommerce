import AdminProducts from "../components/Admin/AdminProducts.jsx";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AdminHeader from "../components/Layout/AdminHeader";

const AdminProductsPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="W-[80px] 800px:w-[330px]">
          <AdminSidebar active={5} />
        </div>
        <AdminProducts />
      </div>
    </div>
  );
};

export default AdminProductsPage;
