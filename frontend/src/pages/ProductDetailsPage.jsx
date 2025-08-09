import Header from "../components/Layout/Header";
import Footer from "../components/Route/Footer";
import ProductDetails from "../components/products/ProductDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SuggestedProduct from "../components/products/SuggestedProduct.jsx";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [productName, setProductName] = useState(name.replace(/-/g, " "));

  useEffect(() => {
    const data = allProducts && allProducts.find((i) => i.name == productName);
    setData(data);
  }, []);

  console.log(productName);

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
