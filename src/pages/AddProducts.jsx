import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { GlobalContext } from '../context/GlobalState';

const AddProducts = (props) => {
   
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [productId, setProductId] = useState();
  const [thumbnail, setThumbnail] = useState();
  const { products, addProduct, editProduct } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { id } = useParams();
   

  const onSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: uuid(),
      title,
      price,
    };
    addProduct(newProduct);
    navigate('/');
  };
  const onEdit = (e) => {
     
    const newProduct = {
      id: productId,
      title,
      price,
      thumbnail,
    };
    if (id) {
      editProduct(newProduct);
      navigate('/');
    }
  };
  useEffect(() => {
    if (products?.length) {
      const editProduct = products?.find((product) => product.id == id);
       
      setTitle(editProduct?.title);
      setPrice(editProduct?.price);
      setProductId(editProduct?.id);
      setThumbnail(editProduct?.thumbnail);
    }
  }, [id, products]);
  return (
    <>
      <h1>Add Product</h1>
      <form
        onSubmit={onSubmit}
        className='d-flex align-items-center flex-column'
      >
        <div className='col-auto'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='form-control w-50vw'
            placeholder='Enter title'
            required
          />
        </div>
        <br />
        <div className='col-auto'>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='form-control w-100vw'
            placeholder='Enter price'
            required
          />
        </div>
        <div className='d-flex justify-content-between mt-3'>
          {!id ? (
            <button type='submit' className='btn btn-secondary me-5'>
              Submit
            </button>
          ) : (
            <button
              type='button'
              onClick={onEdit}
              className='btn btn-secondary me-5'
            >
              Update
            </button>
          )}
          <Link to='/' className='btn btn-danger cursor-pointer'>
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
};
export default AddProducts;
