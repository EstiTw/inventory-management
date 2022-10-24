import React from "react";
import Item from "./Item";
import Alert from "../utils/Alert";
import { useInventoryContext } from "../context/inventory_context";

const InventoryList = () => {
  const { updateInventory, editedInvetory, alert, setAlert } =
    useInventoryContext();

  const saveItems = (e) => {
    e.preventDefault();
    updateInventory();
  };

  return (
    <form className="grocery-form" onSubmit={saveItems}>
      <div className="grocery-list">
        <h3>your inventory</h3>
        {editedInvetory &&
          editedInvetory.map((item) => {
            const { productId: id, quantity } = item;
            return <Item key={id} id={id} quantity={quantity} />;
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
