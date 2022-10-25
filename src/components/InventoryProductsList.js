import React from "react";
// import { useProductsContext } from "../context/products_context";
import { useInventoryContext } from "../context/inventory_context";
import Alert from "../utils/Alert";
import Item from "./Item";

const InventoryProductsList = () => {
  const { alert, invetoryToOrder, addPoductsToInventory } =
    useInventoryContext();

  const addItems = (e) => {
    e.preventDefault();
    addPoductsToInventory();
  };

  return (
    <form className="grocery-form" onSubmit={addItems}>
      <div className="grocery-list">
        <h3>add to your inventory</h3>
        {invetoryToOrder &&
          invetoryToOrder.map((item) => {
            return (
              <Item
                key={item.productId}
                {...item}
                inventoryType={invetoryToOrder}
              />
            );
          })}
      </div>
      <button className="clear-btn" onClick={addItems}>
        add items
      </button>
      {alert.show && <Alert {...alert} />}
    </form>
  );
};

export default InventoryProductsList;
