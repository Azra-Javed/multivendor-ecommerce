import { useNavigate } from "react-router-dom";
import ShopLogin from "../components/Shop/shopLogin";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ShopLoginPage = () => {
  const { seller, isSellerAuthenticated } = useSelector(
    (state) => state.seller
  );

  const navigate = useNavigate();
  console.log(seller, isSellerAuthenticated);

  useEffect(() => {
    if (isSellerAuthenticated === true && seller) {
      navigate(`/dashboard`);
    }
  }, [isSellerAuthenticated, navigate, seller]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
