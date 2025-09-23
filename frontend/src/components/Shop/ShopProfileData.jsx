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
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                  <span className="text-[#fff]">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <br />
      {active === 1 && (
        <>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {products &&
              products.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))}
          </div>
          {products && products.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Products!
            </h5>
          )}
        </>
      )}

      {active === 2 && (
        <>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
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
            <h5 className="w-full text-center py-5 text-[18px]">No Events!</h5>
          )}
        </>
      )}

      {active === 3 && (
        <>
          <div className="w-full">
            {allReviews &&
              allReviews.map((item, index) => (
                <div className="w-full flex  my-3">
                  <img
                    src={item.user?.avatar?.url}
                    alt=""
                    className="h-[50px] w-[50px] rounded-full"
                  />

                  <div className="pl-2">
                    <div className="w-full flex items-center">
                      <h1 className="font-[600]">{item.user.name}</h1>
                      <Ratings rating={item.rating} />
                    </div>{" "}
                    <p className="font-[400] text-gray-700">{item?.comment}</p>
                    <p className="text-sm text-gray-500 text-end">
                      {Math.floor(
                        (new Date() - new Date(item.createdAt)) /
                          (1000 * 60 * 60 * 24)
                      )}
                      days ago
                    </p>
                  </div>
                </div>
              ))}
          </div>
          {allReviews && allReviews.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Review Yet!
            </h5>
          )}
        </>
      )}
    </div>
  );
};

export default ShopProfileData;
