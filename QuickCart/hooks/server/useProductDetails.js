import { useEffect, useState } from "react";
import { getProductById, getAllProducts } from "@/services/product.service";

export function useProductDetails(id) {
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const product = await getProductById(id);
        if (!product) throw new Error("Producto no encontrado");
        setProductData(product);

        const allProducts = await getAllProducts();
        const related = allProducts
          .filter(
            (p) =>
              p.idMarca === product.idMarca &&
              p.idCategoria !== product.idCategoria
          )
          .slice(0, 5);
        setRelatedProducts(related);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { productData, relatedProducts, loading, error };
}