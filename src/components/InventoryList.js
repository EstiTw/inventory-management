import React from "react";
import InventoryItem from "./InventoryItem";
import { useInventoryContext } from "../context/inventory_context";

const InventoryList = () => {
  const { inventory } = useInventoryContext();
  console.log(inventory);
  return (
    <div>
      {inventory &&
        inventory.map((item) => {
          return <InventoryItem key={item.productId} {...item} />;
        })}
    </div>
  );
};

export default InventoryList;
