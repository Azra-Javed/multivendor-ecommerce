import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/style";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "underline decoration-[#FFD166] text-[#FFD166]"
                  : "text-black 800px:text-[#F9F9F9]"
              } font-[500] pb-[30px] 800px:pb-0 px-6 cursor-pointer hover:text-[#FFD166]`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
