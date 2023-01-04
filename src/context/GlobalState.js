import React, { createContext, useEffect, useReducer } from 'react';
import { AppReducer } from './AppReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const initialState = {
    products: [],
  };
  const notify = (text) => toast(text);
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const URL = process.env.REACT_APP_PRODUCT_API_URL;

  const addProduct = (product) => {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: product,
    });
    notify('Product has been added');
  };

  const deleteProducts = (productId) => {
    //delete product
    fetch(`${URL}/${productId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.isDeleted) {
          dispatch({
            type: 'DELETE_PRODUCT',
            payload: productId,
          });
          notify('Product has been deleted');
        } else {
          notify(json.message);
        }
      })
  };

  const editProduct = (product) => {
    //  updating product
    fetch(`${URL}/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json) {
          dispatch({
            type: 'EDIT_PRODUCT',
            payload: product,
          });
          notify('Product has been updated');
        }
      });
  };
  useEffect(() => {
    // get all products
    fetch('https://dummyjson.com/products')
      .then(async (res) => {
        let data = await res.json();

        initialState.products = data;
        dispatch(data);
      })
      .then(console.log);
  }, []);

  return (
    <>
      <GlobalContext.Provider
        value={{
          products: state,
          addProduct,
          deleteProducts,
          editProduct,
        }}
      >
        {children}
      </GlobalContext.Provider>
      <ToastContainer
        toastStyle={{ backgroundColor: '#42ba96', color: 'white' }}
      />
    </>
  );
};
