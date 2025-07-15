import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero.jsx";
import Categories from "../components/Route/Categories.jsx";
import BestDeals from "../components/Route/BestDeals.jsx";
import FeaturedProduct from "../components/Route/FeaturedProducts/FreaturedProduct";
import Events from "../components/Route/Events/Events.jsx";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Route/Footer";

const HomePage = () => {
  return (
    <>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </>
  );
};

export default HomePage;
