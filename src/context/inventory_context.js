import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const ENDPOINT_API = "https://fakestoreapi.com/carts/5";

const InventoryContext = React.createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(null);
  const [editedInvetory, setEditedInventory] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  console.log("inventory", inventory);
  console.log("editedInvetory", editedInvetory);
  // console.log(inventory);

  const toggleAmount = (id, value) => {
    const tempInventory = editedInvetory.map((item) => {
      if (item.productId == id) {
        if (value === "inc") {
          let newAmount = item.quantity + 1;
          return { ...item, quantity: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.quantity - 1;
          return { ...item, quantity: newAmount };
        }
      }
      return item;
    });

    setEditedInventory(tempInventory);
  };

  const updateInventory = async () => {
    try {
      const response = await axios.put(ENDPOINT_API, {
        method: "PUT",
        body: JSON.stringify({
          userId: 3,
          date: 2019 - 12 - 10,
          products: { editedInvetory },
        }),
      });
      setInventory(editedInvetory);
      console.log("items saved succesfully!");

      setAlert({
        show: false,
        msg: "",
        type: "",
      });
    } catch (error) {
      console.log(error.response);
      // setEditedInventory(inventory);
      setAlert({
        show: true,
        msg: "failed to save, try again",
        type: "danger",
      });
    }

    // fetch("https://fakestoreapi.com/carts/7", {
    //   method: "PUT",
    //   body: JSON.stringify({
    //     userId: 3,
    //     date: 2019 - 12 - 10,
    //     products: [{ productId: 1, quantity: 3 }],
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((json) => console.log(json));
  };

  const fetchInventory = async () => {
    try {
      const { data } = await axios(ENDPOINT_API);
      const { products } = data;
      console.log("fetchInventory", data);
      setInventory(products);
      setEditedInventory(products);
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
    fetchInventory();
    // setInventory(fetchedInventory);
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        setInventory,
        toggleAmount,
        editedInvetory,
        updateInventory,
        alert,
        setAlert,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => {
  return useContext(InventoryContext);
};
