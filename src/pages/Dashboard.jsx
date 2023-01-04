/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import {IoAddCircleSharp} from "react-icons/io5"
const Dashboard = (props) => {
  const { products, deleteProducts } = useContext(GlobalContext);
  const [productId,setProductId]=useState()
  console.log('products', products);
  const onDelete = ()=>{
    deleteProducts(productId);

  }
  return (
    <>
    <div className='mt-4'>
      <div key="uk" className='d-flex justify-content-between align-items-center text-white bg-dark p-10'>
        <h1 className='ms-5'> Products</h1>
        <Link to='/create-product' className='text-decoration-none link-light me-5'>
          <h4>Add Product<IoAddCircleSharp size={30} className='c-red' color='white'/></h4>
        </Link>
      </div>
      {products?.length > 0 ? (
        <table className='table table-striped'>
          <thead className='thead-dark'>
            <tr className='bg-secondary text-white'>
              <th scope='col'>Thumbnail</th>
              <th scope='col'>Title</th>
              <th scope='col'>Price</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product?.thumbnail}
                      alt='image'
                      style={{ width: '10vw',height:'80px', borderRadius: '5px' }}
                    />
                  </td>
                  <td>
                    <strong>{product.title}</strong>
                  </td>
                  <td>
                    <strong>{product.price}</strong>
                  </td>
                  <td>
                    <Link
                      to={`/product/${product.id}`}
                      className='text-decoration-none'
                    >
                      <FaEdit size={25} />
                    </Link>
                    
                    <AiFillDelete
                      color='red'
                      size={25}
                      className='cursor-pointer'
                      data-bs-toggle="modal" 
                      data-bs-target="#staticBackdrop"
                      onClick={()=>setProductId(product.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h4 className='text-center'>No Products</h4>
      )}
    </div>
    {/* <!-- Modal --> */}
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Do you want delete product.</h1>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={onDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default Dashboard;
