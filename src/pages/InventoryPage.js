import React from "react";
import InventoryList from "../components/InventoryList";
import InventoryProductsList from "../components/InventoryProductsList";

const InventoryPage = () => {
  return (
    <div>
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
    </div>
  );
};

export default InventoryPage;
