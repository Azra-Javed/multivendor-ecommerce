import Header from "../components/Layout/Header";
import Footer from "../components/Route/Footer";
import Faq from "../components/FAQ/Faq";
import { useEffect } from "react";

const FAQPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header activeHeading={5} />
      <Faq />
      <Footer />
    </div>
  );
};

export default FAQPage;
