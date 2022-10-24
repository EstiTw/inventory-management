import React, { useState } from "react";
import ProductsList from "../components/ProductsList";

const ProductsPage = () => {
  const [name, setName] = useState("");

  const addProduct = (e) => {
    e.preventDefault();
    console.log(`${name} added to products`);
  };
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={addProduct}>
        <h3>add product</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            add
          </button>
        </div>
      </form>

      <div className="grocery-container">
        <ProductsList />
      </div>
    </section>
  );
};

export default ProductsPage;
