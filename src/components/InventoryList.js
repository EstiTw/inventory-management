import React from "react";
import Item from "./Item";
import Alert from "../utils/Alert";
import { useInventoryContext } from "../context/inventory_context";

const InventoryList = () => {
  const { updateInventory, editableInvetory, alert } = useInventoryContext();

  const saveItems = (e) => {
    e.preventDefault();
    updateInventory();
  };

  return (
    <form className="grocery-form" onSubmit={saveItems}>
      <div className="grocery-list">
        <h3>your inventory</h3>
        {editableInvetory &&
          editableInvetory.map((item) => {
            return (
              <Item
                key={item.productId}
                {...item}
                inventoryType={editableInvetory}
              />
            );
          })}
      </div>
      <button className="clear-btn" onClick={saveItems}>
        save items
      </button>
      {alert.show && <Alert {...alert} />}
    </form>
  );
};

export default InventoryList;
