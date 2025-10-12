import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/style";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState();
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = [...allProducts];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);

  return (
    <>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className="my-3 text-3xl font-semibold mb-8 text-[#2D6A4F]">
            Best Deals
          </h1>

          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12 border-0">
            {data &&
              data.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BestDeals;
