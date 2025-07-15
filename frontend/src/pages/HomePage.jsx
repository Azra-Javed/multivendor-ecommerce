import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero.jsx";
import Categories from "../components/Route/Categories.jsx";
import BestDeals from "../components/Route/BestDeals.jsx";
import FeaturedProduct from "../components/Route/FeaturedProducts/FreaturedProduct.jsx";
const HomePage = () => {
  return (
    <>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <FeaturedProduct />
    </>
  );
};

export default HomePage;
