import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductsList from "../components/ProductsList";
import { useProductsContext } from "../context/products_context";
import Alert from "../utils/Alert";

const ProductsPage = () => {
  const [name, setName] = useState("");
  const { setProductName, alert, isLoading, showAlert } = useProductsContext();

  const addProduct = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      showAlert(true, "danger", "pls enter a value");
    } else {
      setProductName(name);
      setName("");
    }
  };

  if (isLoading) return <div className="loading" />;

  return (
    <>
      <Link to="/" className="clear-btn">
        back to inventory
      </Link>

      <section className="section-center">
        <form className="grocery-form" onSubmit={addProduct}>
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
            <button type="submit" className="submit-btn" onClick={addProduct}>
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
