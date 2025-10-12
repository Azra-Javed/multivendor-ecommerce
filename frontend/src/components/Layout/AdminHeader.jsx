import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);

  return (
    <div className="w-full h-[70px] bg-white shadow-sm sticky top-0 left-0 z-30 flex items-center justify-between px-4 border-b border-gray-100">
      <div>
        <Link to="/">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="Shopo Logo"
            className="h-[38px] object-contain"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/admin/users"
          className="hidden 800px:block text-[#2D6A4F] hover:text-[#FFD166] transition-colors duration-200"
        >
          <FaUsers size={24} />
        </Link>

        <Link
          to="/admin/events"
          className="hidden 800px:block text-[#2D6A4F] hover:text-[#FFD166] transition-colors duration-200"
        >
          <MdOutlineLocalOffer size={24} />
        </Link>

        <Link
          to="/admin/products"
          className="hidden 800px:block text-[#2D6A4F] hover:text-[#FFD166] transition-colors duration-200"
        >
          <FiShoppingBag size={24} />
        </Link>

        <Link
          to="/admin/orders"
          className="hidden 800px:block text-[#2D6A4F] hover:text-[#FFD166] transition-colors duration-200"
        >
          <FiPackage size={24} />
        </Link>

        <Link
          to="/inbox"
          className="hidden 800px:block text-[#2D6A4F] hover:text-[#FFD166] transition-colors duration-200"
        >
          <BiMessageSquareDetail size={24} />
        </Link>

        <Link to={`/shop/${seller?._id}`} className="ml-2">
          <img
            src={user?.avatar?.url || "/default-avatar.png"}
            alt="Admin Avatar"
            className="w-[45px] h-[45px] rounded-full object-cover border-2 border-[#2D6A4F] hover:border-[#FFD166] transition-all duration-200"
          />
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
