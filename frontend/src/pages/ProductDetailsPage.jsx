import Header from "../components/Layout/Header";
import Footer from "../components/Route/Footer";
import ProductDetails from "../components/products/ProductDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";
import SuggestedProduct from "../components/products/SuggestedProduct.jsx";

const ProductDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [productName, setProductName] = useState(name.replace(/-/g, " "));

  useEffect(() => {
    const data = productData.find((i) => i.name == productName);
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
