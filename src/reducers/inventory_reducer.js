const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_INVENTORY_PRODUCTS":
      return {
        ...state,
        invetoryToOrder: action.payload.map((item) => {
          const { id, title } = item;
          return { productId: id, title, quantity: 0 };
        }),
      };

    case "TOGGLE_AMOUNT":
      const { id, value, inventoryType } = action.payload;
      const tempInventory = inventoryType.map((item) => {
        if (item.productId == id || item.id == id) {
          if (value === "inc") {
            let newAmount = item.quantity + 1;
            return { ...item, quantity: newAmount };
          }
          if (value === "dec") {
            if (item.quantity === 0) return { ...item, quantity: 0 };
            else {
              let newAmount = item.quantity - 1;
              return { ...item, quantity: newAmount };
            }
          }
        }
        return item;
      });

      if (inventoryType === state.editableInvetory) {
        return { ...state, editableInvetory: tempInventory };
      } else {
        return { ...state, invetoryToOrder: tempInventory };
      }

    case "UPDATE_INVENTORY_LIST":
      return {
        ...state,
        inventory: action.payload,
        alert: { show: false, type: "", msg: "" },
      };

    case "FETCH_INVENTORY":
      return {
        ...state,
        inventory: action.payload,
        editableInvetory: action.payload,
        alert: { show: false, type: "", msg: "" },
        isLoading: false,
      };

    case "SHOW_ALERT": {
      const { show, type, msg } = action.payload;
      return { ...state, alert: { show, type, msg }, isLoading: false };
    }
    case "LOADING": {
      return { ...state, isLoading: true };
    }

    case "ADD_PRODUCTS_TO_INVENTORY": {
      const itemsToAdd = state.invetoryToOrder.filter(
        (orderItem) => orderItem.quantity !== 0
      );

      // items in editableInvetory and in order
      const itemsNotInOrderInventory = state.editableInvetory.filter((item) => {
        const inItemsToAdd = itemsToAdd.find(
          (itemToAdd) => itemToAdd.productId == item.productId
        );
        if (!inItemsToAdd) return item;
      });

      // items in order thet not in editableInvetory
      const notInEditableInventory = itemsToAdd.filter((item) => {
        const indEditable = state.editableInvetory.find(
          (editableItem) => editableItem.productId === item.productId
        );
        if (!indEditable)
          return { productId: item.productId, quantity: item.quantity };
      });

      //shared items - items in both editableInvetory and order
      const sharedItems = itemsToAdd.filter((item) => {
        const indEditable = state.editableInvetory.find(
          (editableItem) => editableItem.productId === item.productId
        );
        if (indEditable) return item;
      });

      // update the quantity in the shared items
      const updatedInEditable = sharedItems.map((item) => {
        const { productId, quantity } = item;
        const editIemQuantity = state.editableInvetory.find(
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
      return {
        ...state,
        editableInvetory: [
          ...updateNotInEditable,
          ...updatedInEditable,
          ...itemsNotInOrderInventory,
        ],
      };
    }
  }

  return state;
};

export default reducer;
