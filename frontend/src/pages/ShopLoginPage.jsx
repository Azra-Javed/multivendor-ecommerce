import { useNavigate } from "react-router-dom";
import ShopLogin from "../components/Shop/shopLogin";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ShopLoginPage = () => {
  const { isSellerAuthenticated, isLoading } = useSelector(
    (state) => state.seller
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isSellerAuthenticated === true) {
      navigate(`/dashboard`);
    }
  }, [isSellerAuthenticated, isLoading]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
