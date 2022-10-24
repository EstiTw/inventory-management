import React, { useState } from "react";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { useInventoryContext } from "../context/inventory_context";
import { useProductsContext } from "../context/products_context";

const Item = ({ id, quantity, title, withoutButtons }) => {
  const { toggleAmount } = useInventoryContext();
  const { products } = useProductsContext();

  //get title for the inventory items (api return just {id, quantity} for GET inventory)
  const getTitle = () => {
    const { title } = products && products.find((item) => item.id === id);
    return title;
  };

  const increase = () => {
    toggleAmount(id, "inc");
  };

  const decrease = () => {
    toggleAmount(id, "dec");
  };

  return (
    <article className="grocery-item">
      <p className="title">{title || getTitle()}</p>
      {quantity && <p className="title">{quantity}</p>}
      {!withoutButtons && (
        <div className="btn-container">
          <button type="button" className="delete-btn" onClick={decrease}>
            <IoRemoveCircle />
          </button>
          <button type="button" className="edit-btn" onClick={increase}>
            <IoAddCircle />
          </button>
        </div>
      )}
    </article>
  );
};

export default Item;
