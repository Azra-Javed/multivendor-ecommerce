import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolder, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSidebar = ({ active }) => {
  const sidebarItems = [
    { id: 1, label: "Dashboard", icon: RxDashboard, path: "/dashboard" },
    {
      id: 2,
      label: "All Orders",
      icon: FiShoppingBag,
      path: "/dashboard-orders",
    },
    {
      id: 3,
      label: "All Products",
      icon: FiPackage,
      path: "/dashboard-products",
    },
    {
      id: 4,
      label: "Create Product",
      icon: AiOutlineFolder,
      path: "/dashboard-create-product",
    },
    {
      id: 5,
      label: "All events",
      icon: MdOutlineLocalOffer,
      path: "/dashboard-events",
    },
    {
      id: 6,
      label: "Create Event",
      icon: VscNewFile,
      path: "/dashboard-create-event",
    },
    {
      id: 7,
      label: "Withdraw Money",
      icon: CiMoneyBill,
      path: "/dashboard-withdraw-money",
    },
    {
      id: 8,
      label: "Shop Inbox",
      icon: BiMessageSquareDetail,
      path: "/dashboard-messages",
    },
    {
      id: 9,
      label: "Discount Codes",
      icon: AiOutlineGift,
      path: "/dashboard-coupons",
    },
    {
      id: 10,
      label: "Refunds",
      icon: HiOutlineReceiptRefund,
      path: "/dashboard-refunds",
    },
    { id: 11, label: "Settings", icon: CiSettings, path: "/settings" },
  ];

  return (
    <div className="w-20 md:w-64 h-[89vh] bg-[#f9fafb] shadow-sm  overflow-y-auto sticky top-0 left-0 z-10 rounded-lg py-5 ">
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
            <span className="hidden md:inline ml-2 text-sm font-medium">
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardSidebar;
