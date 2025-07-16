import Header from "../components/Layout/Header";
import Footer from "../components/Route/Footer";
import Faq from "../components/FAQ/Faq";

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <Faq />
      <Footer />
    </div>
  );
};

export default FAQPage;
