import { CiMoneyBill } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { GrWorkshop } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from "react-router-dom";

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
    <div className="w-64 h-[89vh] bg-[#f9fafb] shadow-md overflow-y-auto rounded-lg py-4">
      {sidebarItems.map(({ id, label, icon: Icon, path }) => {
        const isActive = active === id;
        return (
          <Link
            to={path}
            key={id}
            className={`flex items-center gap-4 px-5 py-3 my-1 rounded-lg transition-all duration-200
              ${
                isActive
                  ? "bg-[#E3F2E1] text-[#2D6A4F] shadow-sm"
                  : "text-gray-700 hover:bg-[#FFD166]/30 hover:text-[#2D6A4F]"
              }`}
          >
            <Icon
              size={22}
              className={`${
                isActive ? "text-[#2D6A4F]" : "text-[#2D6A4F]"
              } min-w-[22px]`}
            />
            <span
              className={`text-base font-sm ${
                isActive ? "text-[#2D6A4F]" : ""
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default AdminSidebar;
