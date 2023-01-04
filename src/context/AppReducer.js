export const AppReducer = (state, action) => {
  switch (action.type) {
    //add products
    case 'ADD_PRODUCT':
      return [...state, action.payload];

    case 'DELETE_PRODUCT':
      let del = state?.filter((product) => {
        return product.id != action.payload;
      });
      return [...del];

    case 'EDIT_PRODUCT':
      const editProduct = action.payload;
      const updateProducts = state?.map((product) => {
        if (product.id == editProduct.id) {
          return editProduct;
        }
        return product;
      });
      return [
        // ...state,
        ...updateProducts,
      ];

    default:
      return state?.products;
  }
};
