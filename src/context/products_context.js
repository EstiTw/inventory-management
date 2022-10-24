import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const ENDPOINT_API = "https://fakestoreapi.com/products";
const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

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
        setAlert({
          show: true,
          msg: "somthing worng with the server, try again",
          type: "danger",
        });
      } else {
        //this api return data even if there is no value, so we check if products did initialize, to prevent setProducts with the mass data in the first useEffect
        if (products.length > 0) {
          //product id will be the name becouse this api return always the same id
          setProducts([...products, { id: productName, title: productName }]);
          setAlert({ show: false, msg: "", type: "" });
        }
      }
    } catch (error) {
      console.log(error.response);
      setAlert({
        show: true,
        msg: "somthing worng with the server, try again",
        type: "danger",
      });
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios(ENDPOINT_API);
      setProducts(data);
      setAlert({
        show: false,
        msg: "",
        type: "danger",
      });
    } catch (error) {
      console.log(error.response);
      setAlert({
        show: true,
        msg: "somthing worng with the server, try again",
        type: "danger",
      });
    }
  };

  useEffect(() => {
    fetchProducts();
    // fetchProductsViaAxios();
  }, []);

  useEffect(() => {
    postProduct();
  }, [productName]);

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

// fetch(ENDPOINT_API, {
//   method: "POST",
//   body: JSON.stringify({
//     title: { productName },
//     price: 13.5,
//     description: "lorem ipsum set",
//     image: "https://i.pravatar.cc",
//     category: "electronic",
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => {
//     // console.log("data", data);
//     if (!data) {
//       console.log("no data");
//       setAlert({
//         show: true,
//         msg: "somthing worng with the server, try again",
//         type: "",
//       });
//     } else {
//       //this api return data even if there is no value, so we check if products did initialize, to prevent setProducts with the mass data in the first useEffect
//       if (products.length > 0) {
//         setProducts([...products, { ...data }]);
//         setAlert({ show: false, msg: "", type: "" });
//       }
//     }
//   });
// };

// const fetchProducts = () => {
//   // console.log("initialize - fetching..");
//   fetch(ENDPOINT_API)
//     .then((res) => res.json())
//     .then((data) => setProducts(data));
// };
