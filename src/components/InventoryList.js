import React from "react";
import Item from "./Item";
import { useInventoryContext } from "../context/inventory_context";

const InventoryList = () => {
  const { inventory } = useInventoryContext();

  const saveItems = (e) => {
    e.preventDefault();
    console.log("items saved succesfully!");
  };

  return (
    <form className="grocery-form" onSubmit={saveItems}>
      <div className="grocery-list">
        <h3>your inventory</h3>
        {inventory &&
          inventory.map((item) => {
            const { productId: id, quantity } = item;
            return <Item key={id} id={id} quantity={quantity} />;
          })}
      </div>
      <button className="clear-btn" onClick={saveItems}>
        save items
      </button>
    </form>
  );
};

export default InventoryList;
