import { Link } from "react-router-dom";
import heroImg from "/src/assets/hero.png";
import styles from "../../styles/style";

const Hero = () => {
  return (
    <section className="w-full bg-white  min-h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-center md:px-20 px-6 gap-10 ">
      {/* ===== LEFT CONTENT ===== */}
      <div className="flex flex-col justify-center items-center md:items-start max-w-[600px] text-center md:text-left">
        <h1 className="text-[36px] md:text-[48px] leading-[1.2] text-[#2D6A4F] font-[700] capitalize font-[Poppins]">
          Best Collection for <br /> Home Decoration
        </h1>

        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#121212]/80 max-w-[500px]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque exercitationem labore vel, dolore quidem
          asperiores, laudantium temporibus soluta optio consequatur aliquam
          deserunt officia. Dolorum saepe nulla provident.
        </p>

        <Link to="/products" className="inline-block mt-8">
          <button
            className={`${styles.button} cursor-pointer hover:text-white transition-all font-[Poppins] text-[18px] px-8 py-3 rounded-md shadow-md duration-300 text-nowrap`}
          >
            Shop Now
          </button>
        </Link>
      </div>

      {/* ===== RIGHT IMAGE ===== */}
      <div className="hidden 800px:flex justify-center items-center w-full md:w-[45%]">
        <img
          src={heroImg}
          alt="Luxury Home Decor"
          className="w-full max-w-[500px] object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
