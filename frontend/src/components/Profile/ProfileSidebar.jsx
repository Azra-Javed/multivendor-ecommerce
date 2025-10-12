import { useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineLogout, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const sidebarItems = [
    { id: 1, label: "Profile", icon: RxPerson },
    { id: 2, label: "Orders", icon: HiOutlineShoppingBag },
    { id: 3, label: "Refunds", icon: HiOutlineReceiptRefund },
    { id: 4, label: "Inbox", icon: AiOutlineMessage, route: "/inbox" },
    { id: 5, label: "Track Order", icon: MdOutlineTrackChanges },
    { id: 6, label: "Change Password", icon: RiLockPasswordLine },
    { id: 7, label: "Address", icon: TbAddressBook },
    ...(user && user.role === "Admin"
      ? [
          {
            id: 8,
            label: "Admin Dashboard",
            icon: MdOutlineAdminPanelSettings,
            route: "/admin/dashboard",
          },
        ]
      : []),
    { id: 9, label: "Log out", icon: AiOutlineLogout, logout: true },
  ];

  const LogoutHandler = () => {
    axios
      .get(`${server}/user/logoutUser`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || error.message);
      });
  };

  const handleClick = (id, route, logout) => {
    setActive(id);
    if (route) navigate(route);
    if (logout) LogoutHandler();
  };

  return (
    <div className="w-full bg-white shadow rounded-lg p-1 flex flex-col space-y-1 800px:p-4 800px:space-y-4">
      {sidebarItems.map(({ id, label, icon: Icon, route, logout }) => (
        <div
          key={id}
          className={`flex flex-col 800px:flex-row items-center justify-center  800px:justify-start cursor-pointer p-1 rounded-md hover:bg-[#f1f1f1] transition-all duration-200 ${
            active === id ? "bg-[#e6f4ea]" : ""
          }`}
          onClick={() => handleClick(id, route, logout)}
        >
          <Icon
            size={22}
            color={active === id ? "#2D6A4F" : "#555"}
            title={label}
            className="my-2 md:my-0"
          />
          <span
            className={`mt-0.5 800px:mt-0 800px:pl-2 text-sm font-medium text-center 800px:text-left ${
              active === id ? "text-[#2D6A4F]" : "text-gray-700"
            } hidden md:inline-block`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProfileSidebar;
