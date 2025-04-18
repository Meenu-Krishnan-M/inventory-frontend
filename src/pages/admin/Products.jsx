import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AdminSidebar from './AdminSidebar';
import { addProductApi, allProductApi, removeProductApi } from '../../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Pagination } from 'react-bootstrap';
import Edit from './Edit';
import { addProductContext, editProductContext } from '../../context/ContextShare';

function Products() {
  const { editProductResponse, setEditProductResponse } = useContext(editProductContext);
  const { addProductResponse, setAddProductResponse } = useContext(addProductContext);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [productDetails, setProductDetails] = useState({
    productName: "", rate: "", quantity: ""
  });
  const [allProduct, setAllProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Limit products per page

  const handleClose = () => {
    setShow(false);
    setProductDetails({
      productName: "", rate: "", quantity: ""
    });
  };

  const handleAddProduct = async (e) => {
    const { productName, rate, quantity } = productDetails;
    if (productName && rate && quantity) {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        try {
          const result = await addProductApi(productDetails, reqHeader);
          if (result.status == 200) {
            toast.success(` ${result?.data?.productName} product Added Successfully`);
            handleClose();
            setAddProductResponse(result);
          } else {
            if (result.response.status == 406) {
              toast.info(result.response.data);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      toast.warning(`Please fill the form completely`);
    }
  };

  const getAllProduct = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };
      const result = await allProductApi(reqHeader);
      setAllProduct(result.data);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, [addProductResponse, editProductResponse]);

  const removeProduct = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };
      try {
        const result = await removeProductApi(id, reqHeader);
        if (result.status == 200) {
          getAllProduct();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProduct.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(allProduct.length / productsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className='container-fluid bg-white min-vh-100'>
        <div className="row">
          <div className="col-2 col-md-2 bg-dark">
            <AdminSidebar />
          </div>
          <div className="col-10 col-md-10">
            <Button variant="primary" className='text-center ms-5 mt-5' onClick={handleShow}>
              Add Product
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title className='text-info'>Add Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container">
                  <div className="flex-column">
                    <div className="mb-3">
                      <input type="text" value={productDetails.productName} onChange={(e) => setProductDetails({ ...productDetails, productName: e.target.value })} className='form-control' placeholder='Product Name' />
                    </div>
                    <div className="mb-3">
                      <input type="text" value={productDetails.rate} onChange={(e) => setProductDetails({ ...productDetails, rate: e.target.value })} className='form-control' placeholder='Rate' />
                    </div>
                    <div className="mb-3">
                      <input type="text" value={productDetails.quantity} onChange={(e) => setProductDetails({ ...productDetails, quantity: e.target.value })} className='form-control' placeholder='Quantity' />
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button onClick={handleAddProduct} variant="primary">
                  Add
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="row mt-5 md:m-5 m-2">
              <Table stripped bordered variant="light" hover size="sm">
                <thead>
                  <tr>
                    <th width="200" className='bg-primary'>Index</th>
                    <th width="200" className='bg-primary'>Product Name</th>
                    <th width="200" className='bg-primary'>MRP</th>
                    <th width="200" className='bg-primary'>Quantity</th>
                    <th width="300" className='bg-primary'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts?.length > 0 ?
                    currentProducts.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.productName}</td>
                        <td>{item.rate}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <Edit data={item} />
                          <Button variant="danger" onClick={() => removeProduct(item?._id)} className='ms-3'>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </tr>
                    ))
                    :
                    <tr>
                      <td colSpan="5" className='text-center text-warning'>
                        No product added yet!
                      </td>
                    </tr>
                  }
                </tbody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                {pageNumbers.map((page) => (
                  <Pagination.Item key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
                    {page}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>

          </div>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={1000} />
      </div>
    </>
  );
}

export default Products;
