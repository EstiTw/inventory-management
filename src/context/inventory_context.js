import React, { useState, useEffect, useContext } from "react";
import { fetchedInventory } from "../data";

const InventoryContext = React.createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(null);
  // console.log(inventory);

  const toggleAmount = (id, value) => {
    const tempInventory = inventory.map((item) => {
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

    setInventory(tempInventory);
  };

  useEffect(() => {
    setInventory(fetchedInventory);
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        setInventory,
        toggleAmount,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => {
  return useContext(InventoryContext);
};
