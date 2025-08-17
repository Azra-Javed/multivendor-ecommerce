import Header from "../components/Layout/Header";
import Footer from "../components/Route/Footer";
import ProductDetails from "../components/products/ProductDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SuggestedProduct from "../components/products/SuggestedProduct.jsx";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = allProducts && allProducts.find((i) => i._id === id);
    setData(data);
  }, [data, allProducts]);

  return (
    <>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
