import React, { useEffect, useContext, useReducer } from "react";
import axios from "axios";
import { useProductsContext } from "./products_context";
import reducer from "../reducers/inventory_reducer";

const ENDPOINT_API = "https://fakestoreapi.com/carts/5";

const InventoryContext = React.createContext();

const initialState = {
  products: [],
  isLoading: true,
  inventory: null,
  editableInvetory: [],
  invetoryToOrder: [],
  alert: { show: false, msg: "", type: "" },
};

export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();

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

  const updateInventoryProducts = () => {
    dispatch({ type: "UPDATE_INVENTORY_PRODUCTS", payload: products });
  };

  const toggleAmount = (id, value, inventoryType) => {
    dispatch({
      type: "TOGGLE_AMOUNT",
      payload: { id: id, value: value, inventoryType: inventoryType },
    });
  };

  const updateInventory = async () => {
    const positiveEditable = state.editableInvetory.filter(
      (item) => item.quantity !== 0
    );
    try {
      const response = await axios.put(ENDPOINT_API, {
        method: "PUT",
        body: JSON.stringify({
          userId: 3,
          date: 2019 - 12 - 10,
          products: positiveEditable,
        }),
      });
      dispatch({ type: "UPDATE_INVENTORY_LIST", payload: positiveEditable });
    } catch (error) {
      console.log(error.response);
      showAlert(true, "danger", "somthing worng with the server, try again");
    }
  };

  //fetch inventory and update the editable inventory
  const fetchInventory = async () => {
    dispatch({ type: "LODING" });
    try {
      const { data } = await axios(ENDPOINT_API);
      const { products } = data;
      dispatch({ type: "FETCH_INVENTORY", payload: products });
    } catch (error) {
      console.log(error.response);
      showAlert(true, "danger", "somthing worng with the server, try again");
    }
  };

  const addPoductsToInventory = () => {
    dispatch({ type: "ADD_PRODUCTS_TO_INVENTORY" });
  };

  //fetch inventory and update the editable inventory
  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    updateInventoryProducts();
  }, [products]);

  //when we update editableInvetory - we update the invetory in api and we reset the products in products to add
  useEffect(() => {
    updateInventory();
    updateInventoryProducts();
  }, [state.editableInvetory]);

  return (
    <InventoryContext.Provider
      value={{
        ...state,
        toggleAmount,
        addPoductsToInventory,
        updateInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => {
  return useContext(InventoryContext);
};
