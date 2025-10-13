import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "/src/assets/logo.png";

const DashboardHeader = () => {
  const { user } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);

  return (
    <div className="w-full h-[70px] bg-white shadow-sm sticky top-0 left-0 z-30 flex items-center justify-between px-4 border-b border-gray-100">
      <div>
        <Link to="/">
          {/* Logo  */}
          <Link to={"/dashboard"} className="flex items-center gap-2">
            <img src={Logo} alt="" className="h-[45px] w-full" />
          </Link>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/dashboard-products"
          className="hidden 800px:block text-[#2D6A4F] hover:text-[#FFD166] transition-colors duration-200"
        >
          <FiShoppingBag size={24} />
        </Link>

        <Link
          to="/dashboard-events"
          className="hidden 800px:block text-[#2D6A4F] hover:text-[#FFD166] transition-colors duration-200"
        >
          <MdOutlineLocalOffer size={24} />
        </Link>

        <Link
          to="/dashboard-orders"
          className="hidden 800px:block text-[#2D6A4F] hover:text-[#FFD166] transition-colors duration-200"
        >
          <FiShoppingBag size={24} />
        </Link>

        <Link
          to="/dashboard-coupons"
          className="hidden 800px:block text-[#2D6A4F] hover:text-[#FFD166] transition-colors duration-200"
        >
          <FiPackage size={24} />
        </Link>

        <Link
          to="/dashboard-messages"
          className="hidden 800px:block text-[#2D6A4F] hover:text-[#FFD166] transition-colors duration-200"
        >
          <BiMessageSquareDetail size={24} />
        </Link>

        <Link to={`/shop/${seller?._id}`}>
          <img
            src={seller?.avatar?.url || "/default-avatar.png"}
            alt="seller Avatar"
            className="w-[45px] h-[45px] rounded-full object-cover border-2 border-[#2D6A4F] hover:border-[#FFD166] transition-all duration-200"
          />
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
