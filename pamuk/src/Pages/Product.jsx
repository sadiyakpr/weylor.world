import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrums from "../Components/Breadcrums/Breadcrums";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();

  // 🛡 Match against normalized id (string)
  const product = allProducts.find((p) => String(p.id) === String(productId));

  if (!product) {
    return <p style={{ padding: "2rem" }}>Loading product...</p>;
  }

  return (
    <div className="product-page">
      {/* <Breadcrums product={product} /> */}
      <ProductDisplay product={product} />
      <DescriptionBox product={product} />
      <RelatedProducts currentCategory={product.category} />
    </div>
  );
};

export default Product;
