import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isSellerAuthenticated, isLoading } = useSelector(
    (state) => state.seller
  );

  //replace means "don’t let the user go back to this page using the browser’s back button."

  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isSellerAuthenticated) {
      return <Navigate to={`/shop-login`} replace />;
    }
  }

  return children;
};

export default SellerProtectedRoute;
