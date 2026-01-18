import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDisplay from "../Components/ProductDisplay";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:4000/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return <ProductDisplay product={product} />;
};

export default ProductPage;
