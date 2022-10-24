import React, { useState, useEffect, useContext } from "react";
import { fetchedInventory } from "../data";

const InventoryContext = React.createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(null);
  const [editedInvetory, setEditedInventory] = useState([]);
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

  const fetchInventory = () => {
    fetch("https://fakestoreapi.com/carts/5")
      .then((res) => res.json())
      .then(({ products }) => {
        setInventory(products);
        setEditedInventory(products);
      });
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
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => {
  return useContext(InventoryContext);
};
