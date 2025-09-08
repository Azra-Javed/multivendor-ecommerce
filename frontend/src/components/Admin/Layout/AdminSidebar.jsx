import { CiMoneyBill } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { GrWorkshop } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";

const AdminSidebar = ({ active }) => {
  const sidebarItems = [
    { id: 1, label: "Dashboard", icon: RxDashboard, path: "/admin/dashboard" },
    {
      id: 2,
      label: "All Orders",
      icon: FiShoppingBag,
      path: "/admin/orders",
    },
    {
      id: 3,
      label: "All Sellers",
      icon: GrWorkshop,
      path: "/admin/sellers",
    },

    {
      id: 4,
      label: "All Users",
      icon: HiOutlineUserGroup,
      path: "/admin/users",
    },

    {
      id: 5,
      label: "All Products",
      icon: BsHandbag,
      path: "/admin/products",
    },

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
    {
      id: 8,
      label: "Settings",
      icon: AiOutlineSetting,
      path: "/profile",
    },
  ];

  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {sidebarItems.map(({ id, label, icon: Icon, path }) => (
        <div key={id} className="w-full flex items-center p-4 ">
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

export default AdminSidebar;
