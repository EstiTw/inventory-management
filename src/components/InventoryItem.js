import React, { useState } from "react";
import { useInventoryContext } from "../context/inventory_context";

const InventoryItem = ({ productId, quantity }) => {
  const { toggleAmount } = useInventoryContext();

  const increase = () => {
    toggleAmount(productId, "inc");
  };

  const decrease = () => {
    toggleAmount(productId, "dec");
  };

  return (
    <div>
      <h5>{productId}</h5>
      <div>
        <button type="button" onClick={decrease}>
          -
        </button>
        <h4>{quantity}</h4>
        <button type="button" onClick={increase}>
          +
        </button>
      </div>
    </div>
  );
};

export default InventoryItem;
