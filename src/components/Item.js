import React from "react";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { useInventoryContext } from "../context/inventory_context";
import { useProductsContext } from "../context/products_context";

const Item = ({
  productId,
  quantity,
  title,
  withoutButtons,
  inventoryType,
}) => {
  const { toggleAmount } = useInventoryContext();
  const { products } = useProductsContext();

  //get title for the inventory items (api return just {id, quantity} for GET inventory)
  const getTitle = () => {
    const { title } =
      products && products.find((item) => item.id === productId);
    return title;
  };

  const increase = () => {
    toggleAmount(productId, "inc", inventoryType || "");
  };

  const decrease = () => {
    toggleAmount(productId, "dec", inventoryType || "");
  };

  return (
    <article className="grocery-item">
      <p className="title">{title || getTitle()}</p>
      <div className="space-container" />
      {!withoutButtons && (
        <div className="btn-container">
          <button
            type="button"
            className="delete-btn icon-button"
            onClick={decrease}
          >
            <IoRemoveCircle />
          </button>
          {<span className="title amount">{quantity}</span>}

          <button
            type="button"
            className="edit-btn icon-button"
            onClick={increase}
          >
            <IoAddCircle />
          </button>
        </div>
      )}
    </article>
  );
};

export default Item;
