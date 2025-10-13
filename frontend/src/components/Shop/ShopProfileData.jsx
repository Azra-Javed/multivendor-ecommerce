import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/features/productSlice";
import styles from "../../styles/style";
import ProductCard from "../ProductCard/ProductCard";
import Ratings from "../products/Ratings";
import { getAllEventsShop } from "../../redux/features/eventSlice";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);

  const { id } = useParams();
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(seller?._id));
  }, [dispatch, seller]);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="w-full bg-white rounded-md shadow-sm p-5 md:p-6">
      {/* Tabs Header */}
      <div className="flex w-full items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setActive(1)}
            className={`font-semibold text-[18px] transition-colors ${
              active === 1
                ? "text-[#2D6A4F] border-b-2 border-[#FFD166]"
                : "text-gray-700 hover:text-[#2D6A4F]"
            } pb-1`}
          >
            Shop Products
          </button>

          <button
            onClick={() => setActive(2)}
            className={`font-semibold text-[18px] transition-colors ${
              active === 2
                ? "text-[#2D6A4F] border-b-2 border-[#FFD166]"
                : "text-gray-700 hover:text-[#2D6A4F]"
            } pb-1`}
          >
            Running Events
          </button>

          <button
            onClick={() => setActive(3)}
            className={`font-semibold text-[18px] transition-colors ${
              active === 3
                ? "text-[#2D6A4F] border-b-2 border-[#FFD166]"
                : "text-gray-700 hover:text-[#2D6A4F]"
            } pb-1`}
          >
            Shop Reviews
          </button>
        </div>

        {isOwner && (
          <Link to="/dashboard">
            <div
              className={`${styles.button} !rounded-md !h-[40px] bg-[#2D6A4F] hover:bg-[#1B4332] transition`}
            >
              <span className="text-white text-[15px] font-medium">
                Go Dashboard
              </span>
            </div>
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="mt-6">
        {active === 1 && (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-10">
              {products &&
                products.map((i, index) => (
                  <ProductCard data={i} key={index} isShop={true} />
                ))}
            </div>
            {products && products.length === 0 && (
              <h5 className="text-center py-5 text-[16px] text-gray-600">
                No Products!
              </h5>
            )}
          </>
        )}

        {active === 2 && (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-10">
              {events &&
                events.map((i, index) => (
                  <ProductCard
                    data={i}
                    key={index}
                    isShop={true}
                    isEvent={true}
                  />
                ))}
            </div>
            {events && events.length === 0 && (
              <h5 className="text-center py-5 text-[16px] text-gray-600">
                No Events!
              </h5>
            )}
          </>
        )}

        {active === 3 && (
          <>
            <div className="w-full space-y-4">
              {allReviews &&
                allReviews.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start bg-white p-4 rounded-xl border border-[#2D6A4F]/20 shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={item.user?.avatar?.url}
                      alt=""
                      className="h-[50px] w-[50px] rounded-full object-cover border-2 border-[#FFD166]"
                    />
                    <div className="pl-3 w-full">
                      <div className="flex items-center justify-between">
                        <h1 className="font-semibold text-[#2D6A4F]">
                          {item.user.name}
                        </h1>
                        <Ratings rating={item.rating} />
                      </div>
                      <p className="text-gray-700 text-[15px] mt-1">
                        {item?.comment}
                      </p>
                      <p className="text-sm text-gray-500 text-right mt-1">
                        {Math.floor(
                          (new Date() - new Date(item.createdAt)) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days ago
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            {allReviews && allReviews.length === 0 && (
              <h5 className="text-center py-5 text-[16px] text-gray-600">
                No Reviews Yet!
              </h5>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShopProfileData;
