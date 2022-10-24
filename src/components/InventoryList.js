import React from "react";
import Item from "./Item";
import { useInventoryContext } from "../context/inventory_context";

const InventoryList = () => {
  const { inventory, editedInvetory, setInventory } = useInventoryContext();

  const saveItems = (e) => {
    e.preventDefault();
    //update the api inventory and then:
    setInventory(editedInvetory); //upadte the local inventory or do it in the post function
    console.log("items saved succesfully!");
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
    </form>
  );
};

export default InventoryList;
