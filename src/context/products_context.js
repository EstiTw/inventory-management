import React, { useState, useEffect, useContext } from "react";
import { fetchedProducts } from "../data";

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  // console.log(products);
  const [editableProducts, setEditableProducts] = useState([]);
  // console.log("editableProducts", editableProducts);

  useEffect(() => {
    setProducts(fetchedProducts);
    if (products) setEditableProducts(products);
  }, []);

  useEffect(() => {
    if (products) setEditableProducts(products);
  }, [products]); //change to isLoading

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
