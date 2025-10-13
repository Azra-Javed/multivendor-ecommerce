import React from "react";
import styles from "../../styles/style";
import { brandingData, categoriesData } from "../../static/data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Branding Section */}
      <section className={`${styles.section} hidden sm:block`}>
        <div className="branding my-8 mt-0 flex justify-between w-full shadow-sm bg-gray-50 p-4 rounded-md">
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                <div className="text-xl">{i.icon}</div>
                <div className="px-2">
                  <h3 className="font-semibold text-sm">{i.title}</h3>
                  <p className="text-xs text-gray-600">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Categories Section */}
      <section
        className={`${styles.section} bg-gray-50 shadow p-4 rounded-md mb-10`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) =>
                navigate(`/products?category=${i.title}`);

              return (
                <div
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                  className="w-full h-[80px] flex items-center justify-between cursor-pointer overflow-hidden hover:shadow-sm transition-all duration-200 rounded-md px-2 "
                >
                  <h5 className="text-sm font-medium">{i.title}</h5>
                  <img
                    src={i.image_Url}
                    alt={i.title}
                    className="w-[90px] object-contain"
                  />
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Categories;
