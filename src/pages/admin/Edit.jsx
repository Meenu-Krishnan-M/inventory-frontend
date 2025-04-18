import React, { useContext } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateProductApi } from '../../services/allApi';
import { editProductContext } from '../../context/ContextShare';

const Edit = ({ data }) => {
 const {editProductResponse,setEditProductResponse} = useContext(editProductContext)
  const [productDetails, setProductDetails] = useState({
    id:data?._id,
    productName: data?.productName, rate: data?.rate, quantity: data?.quantity
  })
  console.log(productDetails);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdateProduct = async () => {
    const { id, productName, rate, quantity } = productDetails
    if (productName && rate && quantity) {
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        //make api call
        try {
          const result = await updateProductApi(id,productDetails, reqHeader)
          // console.log(result);
          if (result.status == 200) {
            alert(` product update successfully`)
            handleClose()
            setEditProductResponse(result) 
          }
        } catch (err) {
          console.log(err);

        }
      }
    } else {
      alert('please fill the form completely')
    }
  }

  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div >
              <div className="flex-column">
                <div className="mb-3">
                  <input type="text" value={productDetails.productName} onChange={(e) => setProductDetails({ ...productDetails, productName: e.target.value })} className='form-control' placeholder='Product Name' />
                </div>
                <div className="mb-3">
                  <input type="text" value={productDetails.rate} onChange={(e) => setProductDetails({ ...productDetails, rate: e.target.value })} className='form-control' placeholder='rate' />
                </div>
                <div className="mb-3">
                  <input type="text" value={productDetails.quantity} onChange={(e) => setProductDetails({ ...productDetails, quantity: e.target.value })} className='form-control' placeholder='Quantity' />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProduct}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit