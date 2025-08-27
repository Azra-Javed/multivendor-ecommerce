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
    {
      id: 11,
      label: "Settings",
      icon: CiSettings,
      path: "/dashboard-settings",
    },
  ];

  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {sidebarItems.map(({ id, label, icon: Icon, path }) => (
        <div key={id} className="w-full flex items-center p-4">
          <Link to={path} className="w-full flex items-center">
            <Icon
              size={30}
              color={active === id ? "crimson" : "#555"}
              title={label}
            />
            <h5
              className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                active === id ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              {label}
            </h5>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DashboardSidebar;
