const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PRODUCTS":
      return {
        ...state,
        products: [...state.products, action.payload],
        alert: { show: false, type: "", msg: "" },
      };
    case "SET_PRODUCT_NAME": {
      return { ...state, productName: action.payload };
    }
    case "SHOW_ALERT": {
      const { show, type, msg } = action.payload;
      return { ...state, alert: { show, type, msg }, isLoading: false };
    }
    case "LOADING": {
      return { ...state, isLoading: true };
    }
    case "DISPLAY_PRODUCTS": {
      return {
        state,
        products: action.payload,
        isLoading: false,
        alert: { show: false, type: "", msg: "" },
      };
    }
  }

  return state;
};

export default reducer;
