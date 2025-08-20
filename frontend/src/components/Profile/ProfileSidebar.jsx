import { useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineLogout, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

const sidebarItems = [
  { id: 1, label: "Profile", icon: RxPerson },
  { id: 2, label: "Orders", icon: HiOutlineShoppingBag },
  { id: 3, label: "Refunds", icon: HiOutlineReceiptRefund },
  { id: 4, label: "Inbox", icon: AiOutlineMessage, route: "/inbox" },
  { id: 5, label: "Track Order", icon: MdOutlineTrackChanges },
  { id: 6, label: "Change Password", icon: RiLockPasswordLine },
  { id: 7, label: "Address", icon: TbAddressBook },
  { id: 8, label: "Log out", icon: AiOutlineLogout, logout: true },
];

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const LogoutHandler = () => {
    axios
      .get(`${server}/user/logoutUser`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
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
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {sidebarItems.map(({ id, label, icon: Icon, route, logout }) => (
        <div
          key={id}
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => handleClick(id, route, logout)}
        >
          <Icon size={20} color={active === id ? "red" : ""} title={label} />
          <span
            className={`pl-3 ${
              active === id ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProfileSidebar;
