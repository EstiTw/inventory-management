import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useProductsContext } from "./products_context";

const ENDPOINT_API = "https://fakestoreapi.com/carts/5";

const InventoryContext = React.createContext();

export const InventoryProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [isLoading, setIsLoading] = useState(false);
  const [inventory, setInventory] = useState(null);
  const [editableInvetory, setEditableInventory] = useState([]);
  const [invetoryToOrder, setInventoryToOrder] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const updateInventoryProducts = () => {
    const orderInventory = products.map((item) => {
      const { id, title } = item;
      return { productId: id, title, quantity: 0 };
    });
    setInventoryToOrder(orderInventory);
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const toggleAmount = (id, value, inventoryType) => {
    const tempInventory = inventoryType.map((item) => {
      if (item.productId == id || item.id == id) {
        if (value === "inc") {
          let newAmount = item.quantity + 1;
          return { ...item, quantity: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.quantity - 1;
          return { ...item, quantity: newAmount };
        }
      }
      return item;
    });

    {
      inventoryType === editableInvetory
        ? setEditableInventory(tempInventory)
        : setInventoryToOrder(tempInventory);
    }
  };

  const updateInventory = async () => {
    try {
      const response = await axios.put(ENDPOINT_API, {
        method: "PUT",
        body: JSON.stringify({
          userId: 3,
          date: 2019 - 12 - 10,
          products: { editableInvetory },
        }),
      });
      setInventory(editableInvetory);
      showAlert(false, "", "");
    } catch (error) {
      console.log(error.response);
      showAlert(true, "failed to save, try again", "danger");
    }
  };

  //fetch inventory and update the editable inventory
  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios(ENDPOINT_API);
      const { products } = data;
      setInventory(products);
      setEditableInventory(products);
      showAlert(false, "", "");
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      showAlert(true, "somthing worng with the server, try again", "danger");
      setIsLoading(false);
    }
  };

  const addPoductsToInventory = () => {
    const itemsToAdd = invetoryToOrder.filter(
      (orderItem) => orderItem.quantity !== 0
    );

    // items in editableInvetory and in order
    const itemsNotInOrderInventory = editableInvetory.filter((item) => {
      const inItemsToAdd = itemsToAdd.find(
        (itemToAdd) => itemToAdd.productId == item.productId
      );
      if (!inItemsToAdd) return item;
    });

    // items in order thet not in editableInvetory
    const notInEditableInventory = itemsToAdd.filter((item) => {
      const indEditable = editableInvetory.find(
        (editableItem) => editableItem.productId === item.productId
      );
      if (!indEditable)
        return { productId: item.productId, quantity: item.quantity };
    });

    //shared items - items in both editableInvetory and order
    const sharedItems = itemsToAdd.filter((item) => {
      const indEditable = editableInvetory.find(
        (editableItem) => editableItem.productId === item.productId
      );
      if (indEditable) return item;
    });

    // update the quantity in the shared items
    const updatedInEditable = sharedItems.map((item) => {
      const { productId, quantity } = item;
      const editIemQuantity = editableInvetory.find(
        (item) => item.productId == productId
      ).quantity;

      return { productId: productId, quantity: quantity + editIemQuantity };
    });

    //refractoring - return just the productId and quantity
    const updateNotInEditable = notInEditableInventory.map((item) => {
      const q = item.quantity;
      const id = item.productId;
      return { productId: id, quantity: q };
    });

    //update the editableInvetory with products
    const newEditableInventory = [
      ...updateNotInEditable,
      ...updatedInEditable,
      ...itemsNotInOrderInventory,
    ];
    setEditableInventory(newEditableInventory);
  };

  //fetch inventory and update the editable inventory
  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    updateInventoryProducts();
  }, [products]);

  //when we update editableInvetory - we update the invetory in api and we reset the products in products to add
  useEffect(() => {
    updateInventory();
    //if no errors:
    updateInventoryProducts();
  }, [editableInvetory]);

  return (
    <InventoryContext.Provider
      value={{
        alert,
        isLoading,
        inventory,
        toggleAmount,
        editableInvetory,
        invetoryToOrder,
        setEditableInventory,
        showAlert,
        addPoductsToInventory,
        updateInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => {
  return useContext(InventoryContext);
};
