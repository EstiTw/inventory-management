import React, { useState, useEffect, useContext } from "react";
// import { fetchedProducts } from "../data";

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const postProduct = () => {
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: { productName },
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (!data) {
          console.log("no data");
          setAlert({
            show: true,
            msg: "somthing worng with the server, try again",
            type: "danger",
          });
        } else {
          console.log("there is data!");

          setProducts([...products, { ...data }]);
          setAlert({ show: false, msg: "", type: "" });
        }
      });
  };

  const fetchProducts = () => {
    console.log("initialize - fetching..");
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        alert,
        setAlert,
        setProductName,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
