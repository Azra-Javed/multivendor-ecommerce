import { Link } from "react-router-dom";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { GrWorkshop } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";

const AdminSidebar = ({ active }) => {
  const sidebarItems = [
    { id: 1, label: "Dashboard", icon: RxDashboard, path: "/admin/dashboard" },
    { id: 2, label: "All Orders", icon: FiShoppingBag, path: "/admin/orders" },
    { id: 3, label: "All Sellers", icon: GrWorkshop, path: "/admin/sellers" },
    {
      id: 4,
      label: "All Users",
      icon: HiOutlineUserGroup,
      path: "/admin/users",
    },
    { id: 5, label: "All Products", icon: BsHandbag, path: "/admin/products" },
    {
      id: 6,
      label: "All Events",
      icon: MdOutlineLocalOffer,
      path: "/admin/events",
    },
    {
      id: 7,
      label: "Withdraw Request",
      icon: CiMoneyBill,
      path: "/admin-withdraw-request",
    },
    { id: 8, label: "Settings", icon: AiOutlineSetting, path: "/profile" },
  ];

  return (
    <div className="w-20 sm:w-64 h-[89vh] bg-[#f9fafb] shadow-sm overflow-y-auto sticky top-0 left-0 z-10 rounded-lg py-5">
      {sidebarItems.map(({ id, label, icon: Icon, path }) => {
        const isActive = active === id;
        return (
          <Link
            to={path}
            key={id}
            className={`flex items-center justify-center sm:justify-start px-2 sm:px-4 py-2 my-1 rounded-lg transition-all duration-200
              ${
                isActive
                  ? "bg-[#E3F2E1] text-[#2D6A4F]"
                  : "text-gray-600 hover:bg-[#FFD166]/30 hover:text-[#2D6A4F]"
              }`}
            title={label}
          >
            <Icon
              size={24}
              className={`${isActive ? "text-[#2D6A4F]" : "text-gray-600"}`}
            />
            <span className="hidden sm:inline ml-2 text-sm font-medium">
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default AdminSidebar;
