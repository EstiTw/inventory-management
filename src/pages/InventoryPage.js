import React from "react";
import { Link } from "react-router-dom";
import InventoryList from "../components/InventoryList";
import InventoryProductsList from "../components/InventoryProductsList";
import { useInventoryContext } from "../context/inventory_context";

const InventoryPage = () => {
  const { isLoading } = useInventoryContext();

  if (isLoading) return <div className="loading" />;

  return (
    <>
      <Link to="/products" className="clear-btn">
        to products page
      </Link>
      <section className="section-center">
        <div className="grocery-container">
          <InventoryList />
        </div>
      </section>
      <section className="section-center">
        <div className="grocery-container">
          <InventoryProductsList />
        </div>
      </section>
    </>
  );
};

export default InventoryPage;
