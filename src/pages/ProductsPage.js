import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductsList from "../components/ProductsList";
import { useProductsContext } from "../context/products_context";
import Alert from "../utils/Alert";

const ProductsPage = () => {
  const [name, setName] = useState("");
  const { addProduct, alert, isLoading } = useProductsContext();

  //FIX: setName(""); in success adding product

  if (isLoading) return <div className="loading" />;

  return (
    <>
      <Link to="/" className="clear-btn">
        back to inventory
      </Link>

      <section className="section-center">
        <form
          className="grocery-form"
          onSubmit={(e) => {
            e.preventDefault();
            addProduct(name);
          }}
        >
          {alert.show && <Alert {...alert} />}
          <h3>add product</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="e.g. eggs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              className="submit-btn"
              onClick={(e) => {
                e.preventDefault();
                addProduct(name);
              }}
            >
              add
            </button>
          </div>
        </form>

        <div className="grocery-container">
          <ProductsList />
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
