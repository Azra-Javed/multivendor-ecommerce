import { Link } from "react-router-dom";
import styles from "../../styles/style";
import { useState } from "react";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import { backend_url } from "../../server.js";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/whishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      {loading ? null : (
        <>
          <section className={`${styles.section}`}>
            <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
              {/* Logo  */}
              <div>
                <Link to="/">
                  <img
                    src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                    alt="shopo logo"
                    className="mt-2 cursor-pointer"
                  />
                </Link>
              </div>
              {/*Search Bar */}
              <div className="w-[50%] relative">
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-2  border-[#3957db] border-[2px] rounded-md"
                />
                <AiOutlineSearch
                  size={30}
                  className="absolute right-2 top-1.5 cursor-pointer"
                />

                {searchData && searchData.length !== 0 ? (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {searchData &&
                      searchData.map((i, index) => {
                        const d = i.name;
                        const product_name = d.replace(/\s+/g, "-");
                        return (
                          <Link to={`/product/${product_name}`}>
                            <div className="w-full flex items-start py-3">
                              <img
                                src={i.image_Url[0].url}
                                alt=""
                                className="w-[40px] h-[40px] mr-[10px]"
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>
              {/* seller button */}
              <div className={`${styles.button}`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
            </div>
          </section>

          {/* New Section */}
          <section
            className={`${
              active === true ? "shadow-md fixed top-0 left-0 z-10" : null
            } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
          >
            <div
              className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
            >
              {/* Categories */}

              <div>
                <div
                  className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block z-100"
                  onClick={() => setDropDown(!dropDown)}
                >
                  <BiMenuAltLeft size={30} className="absolute top-3 left-2 " />
                  <button
                    className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md cursor-pointer`}
                  >
                    All Categories
                  </button>
                  <IoIosArrowDown
                    size={20}
                    className="absolute right-2 top-4 cursor-pointer"
                    onClick={() => setDropDown(!dropDown)}
                  />

                  {dropDown ? (
                    <DropDown
                      categoriesData={categoriesData}
                      setDropDown={setDropDown}
                    />
                  ) : null}
                </div>
              </div>

              {/* NavBar */}
              <div className={`${styles.noramlFlex}`}>
                <Navbar active={activeHeading} />
              </div>

              {/* whishlist icon */}
              <div className="flex">
                <div className={`${styles.noramlFlex}`}>
                  <div
                    className="relative cursor-pointer mr-[15px]"
                    onClick={() => setOpenWishlist(true)}
                  >
                    <AiOutlineHeart
                      size={30}
                      style={{ color: "rgb(255 255 255/83%)" }}
                    />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4  p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      0
                    </span>
                  </div>
                </div>

                {/* shopping cart */}

                <div className={`${styles.noramlFlex}`}>
                  <div
                    className="relative cursor-pointer mr-[15px]"
                    onClick={() => setOpenCart(true)}
                  >
                    <AiOutlineShoppingCart
                      size={30}
                      style={{ color: "rgb(255 255 255/83%)" }}
                    />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4  p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      0
                    </span>
                  </div>
                </div>

                {/* profile icon */}

                <div className={`${styles.noramlFlex}`}>
                  <div className="relative cursor-pointer mr-[15px]">
                    {isAuthenticated ? (
                      <Link to="/profile">
                        <img
                          src={`${backend_url}${user.avatar}`}
                          alt=""
                          className="w-[35px] h-[35px] rounded-full"
                        />
                      </Link>
                    ) : (
                      <Link to="/login">
                        <CgProfile
                          size={30}
                          style={{ color: "rgb(255 255 255/83%)" }}
                        />
                      </Link>
                    )}
                  </div>
                </div>

                {/*cart popup */}
                {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

                {/*whishlist popup */}
                {openWishlist ? (
                  <Wishlist setOpenWishlist={setOpenWishlist} />
                ) : null}
              </div>
            </div>
          </section>

          {/* mobile header */}
          <div
            className={`${
              active === true ? "shadow-md fixed top-0 left-0 z-10" : null
            }  w-full h-[70px]  bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
          >
            <div className="w-full flex items-center justify-between">
              <div>
                <BiMenuAltLeft
                  size={40}
                  className="ml-4 cursor-pointer"
                  onClick={() => setOpen(true)}
                />
              </div>
              <div>
                <Link to="/">
                  <img
                    src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                    alt="shopo logo"
                    className="mt-3 cursor-pointer"
                  />
                </Link>
              </div>

              <div>
                <div
                  className="relative mr-[20px]"
                  onClick={() => setOpenCart(true)}
                >
                  <AiOutlineShoppingCart size={30} />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4  p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    1
                  </span>
                </div>
              </div>
            </div>

            {/* header sidebar */}
            {open && (
              <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
                <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
                  <div className="w-full justify-between flex pr-3">
                    <div>
                      <div className="relative mr-[15px]">
                        <AiOutlineHeart
                          size={30}
                          className="mt-5 ml-3 cursor-pointer"
                        />
                        <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4  p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                          0
                        </span>
                      </div>
                    </div>

                    <RxCross1
                      size={30}
                      className="ml-4 mt-5 cursor-pointer"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  {/* search bar */}
                  <div className="my-8 w-[90%] m-auto h-[40px] relative">
                    <input
                      type="text"
                      placeholder="Search Product..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="h-[40px] w-full px-2  border-[#3957db] border-[2px] rounded-md"
                    />

                    {searchData && searchData.length !== 0 ? (
                      <div className="absolute min-h-[30vh] bg-white shadow-sm-2 z-[10] p-4">
                        {searchData &&
                          searchData.map((i, index) => {
                            const d = i.name;
                            const product_name = d.replace(/\s+/g, "-");
                            return (
                              <Link to={`/product/${product_name}`}>
                                <div className="w-full flex items-start py-3">
                                  <img
                                    src={i.image_Url[0].url}
                                    alt=""
                                    className="w-[40px] h-[40px] mr-[10px]"
                                  />
                                  <h5>{i.name}</h5>
                                </div>
                              </Link>
                            );
                          })}
                      </div>
                    ) : null}
                  </div>
                  <Navbar active={activeHeading} /> {/* seller button */}
                  <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                    <Link to="/shop-create">
                      <h1 className="text-[#fff] flex items-center">
                        Become Seller <IoIosArrowForward className="ml-1" />
                      </h1>
                    </Link>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div className="flex w-full justify-center">
                    {!isAuthenticated ? (
                      <>
                        <Link
                          to="/login"
                          className="text-[18px] pr-5 text-[#000000b7]"
                        >
                          Login/
                        </Link>
                        <Link
                          to="/sign-up"
                          className="text-[18px] text-[#000000b7]"
                        >
                          Sign up
                        </Link>
                      </>
                    ) : (
                      <div>
                        <Link to="/profile">
                          <img
                            src={`${backend_url}${user.avatar}`}
                            alt=""
                            className="w-[60px] h-[60px] rounded-full border-[3px]  border-[green]"
                          />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Header;
