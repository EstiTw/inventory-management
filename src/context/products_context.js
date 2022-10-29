import React, { useEffect, useContext, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/products_reducer";

const ENDPOINT_API = "https://fakestoreapi.com/products";

const ProductsContext = React.createContext();

const initialState = {
  products: [],
  isLoading: true,
  productName: null,
  alert: { show: false, msg: "", type: "" },
};

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showAlert = (show, type, msg) => {
    dispatch({
      type: "SHOW_ALERT",
      payload: {
        show: show,
        type: type,
        msg: msg,
      },
    });
  };

  const addProduct = (name) => {
    if (name.trim() === "") {
      showAlert(true, "danger", "pls enter a value");
    } else {
      //check if products include this name
      const productsContainName = state.products.find(
        (item) => item.title === name
      );
      if (productsContainName)
        showAlert(true, "danger", "product is already in the list");
      else dispatch({ type: "SET_PRODUCT_NAME", payload: name });
    }
  };

  const fetchProducts = async () => {
    dispatch({ type: "LOADING" });

    try {
      const { data } = await axios(ENDPOINT_API);
      dispatch({ type: "DISPLAY_PRODUCTS", payload: data });
    } catch (error) {
      console.log(error.response);
      showAlert(true, "danger", "somthing worng with the server, try again");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (state.productName) {
      (async () => {
        try {
          const req = await axios.post(ENDPOINT_API, {
            method: "POST",
            body: JSON.stringify({
              title: state.productName,
              price: 13.5,
              description: "lorem ipsum set",
              image: "https://i.pravatar.cc",
              category: "electronic",
            }),
          });

          if (req.data)
            dispatch({
              type: "UPDATE_PRODUCTS",
              payload: { id: state.productName, title: state.productName },
            });
          else
            showAlert(
              true,
              "danger",
              "somthing worng with the server, try again"
            );
        } catch (error) {
          console.log(error.response);
          showAlert(
            true,
            "danger",
            "somthing worng with the server, try again"
          );
        }
      })();
    }

    return () => {
      console.log("cleaning");
    };
  }, [state.productName]);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        addProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
