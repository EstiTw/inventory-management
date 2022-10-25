import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const ENDPOINT_API = "https://fakestoreapi.com/products";
const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const postProduct = async () => {
    try {
      const { data } = await axios.post(ENDPOINT_API, {
        method: "POST",
        body: JSON.stringify({
          title: { productName },
          price: 13.5,
          description: "lorem ipsum set",
          image: "https://i.pravatar.cc",
          category: "electronic",
        }),
      });
      if (!data) {
        showAlert(true, "danger", "somthing worng with the server, try again");
      } else {
        //this api return data even if there is no value, so we check if products did initialize, to prevent setProducts with the mass data in the first useEffect
        if (products.length > 0) {
          //product id will be the name becouse this api return always the same id
          setProducts([...products, { id: productName, title: productName }]);
          showAlert(false, "", "");
        }
      }
    } catch (error) {
      console.log(error.response);
      showAlert(true, "danger", "somthing worng with the server, try again");
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios(ENDPOINT_API);
      setProducts(data);
      showAlert(false, "", "");
    } catch (error) {
      console.log(error.response);
      showAlert(true, "danger", "somthing worng with the server, try again");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    postProduct();
  }, [productName]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        alert,
        showAlert,
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
