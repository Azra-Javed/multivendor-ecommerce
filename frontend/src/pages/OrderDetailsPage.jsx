import Header from "../components/Layout/Header";
import Footer from "../components/Route/Footer";
import UserOrderDetails from "../components/Orders/UserOrderDetails.jsx";

const OrderDetailsPage = () => {
  return (
    <>
      <Header />
      <UserOrderDetails />
      <Footer />
    </>
  );
};

export default OrderDetailsPage;
