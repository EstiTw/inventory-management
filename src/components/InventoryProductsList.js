import React, { useState, useEffect } from "react";
import { useProductsContext } from "../context/products_context";
import Item from "./Item";

const InventoryProductsList = () => {
  const { products } = useProductsContext();
  // console.log(products);

  const addItems = (e) => {
    e.preventDefault();
    console.log("products added to inventory");
  };

  return (
    <form className="grocery-form" onSubmit={addItems}>
      <div className="grocery-list">
        <h3>add to your inventory</h3>
        {products &&
          products.map((item) => {
            const { id } = item;
            return <Item key={id} id={id} quantity={0} />;
          })}
      </div>
      <button className="clear-btn" onClick={addItems}>
        add items
      </button>
    </form>
  );
};

export default InventoryProductsList;
