import React, { useState } from "react";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { useInventoryContext } from "../context/inventory_context";
const Item = ({ id, quantity, withoutButtons }) => {
  const { toggleAmount } = useInventoryContext();

  const increase = () => {
    toggleAmount(id, "inc");
  };

  const decrease = () => {
    toggleAmount(id, "dec");
  };

  return (
    <article className="grocery-item">
      <p className="title">{id}</p>
      {quantity && <p className="title">{quantity}</p>}
      {!withoutButtons && (
        <div className="btn-container">
          <button type="button" className="delete-btn" onClick={decrease}>
            <IoRemoveCircle />
          </button>
          <button type="button" className="edit-btn" onClick={increase}>
            <IoAddCircle />
          </button>
          {/* <p className="title">{amount}</p> */}
        </div>
      )}
    </article>
  );
};

export default Item;
