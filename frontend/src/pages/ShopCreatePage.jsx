import { useSelector } from "react-redux";
import ShopCreate from "../components/Shop/ShopCreate.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ShopCreatePage = () => {
  const { seller, isSellerAuthenticated } = useSelector(
    (state) => state.seller
  );

  const navigate = useNavigate();
  console.log(seller, isSellerAuthenticated);

  useEffect(() => {
    if (isSellerAuthenticated === true && seller) {
      navigate(`/shop/${seller._id}`);
    }
  }, [isSellerAuthenticated, navigate, seller]);
  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
