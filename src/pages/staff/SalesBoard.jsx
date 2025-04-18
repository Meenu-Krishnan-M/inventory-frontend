import React, { useEffect, useState } from 'react';
import { Table, Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { allProductApi, submitSaleApi } from '../../services/allApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function SalesBoard() {
  const [searchKey, setSearchKey] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [productCount, setProductCount] = useState(false);
  const navigate = useNavigate();
  const userDetails = JSON.parse(sessionStorage.getItem('staffs'));
  const staffName = userDetails?.username || 'Staff';

  const getSearchedProducts = async (searchKey) => {
    if (searchKey && sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await allProductApi(reqHeader, searchKey);
      setSearchedProducts(result.data);
    } else {
      setSearchedProducts([]);
    }
  };

  const handleProductSelect = (product) => {
    if (product.quantity > 0) {
      if (!selectedProducts.some((item) => item._id === product._id)) {
        setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
        setSearchKey('');
      }
    } else {
      alert('This product is out of stock!');
    }
  };

  const handleIncrement = (productId) => {
    setSelectedProducts((prev) =>
      prev.map((item) => {
        if (item._id === productId) {
          const dbProduct = searchedProducts.find((p) => p._id === productId);
          if (dbProduct && item.quantity >= dbProduct.quantity) {
            alert('Product is out of stock!');
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const handleDecrement = (productId) => {
    setSelectedProducts((prev) =>
      prev.map((item) =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((item) => item._id !== productId));
  };

  const calculateTotal = () => {
    let count = 0;
    let cost = 0;
    selectedProducts.forEach((item) => {
      count += item.quantity;
      cost += item.rate * item.quantity;
    });
    setProductCount(count);
    setTotalCost(cost);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const handleSubmitSale = async () => {
    if (selectedProducts.length === 0) {
      alert("No products selected!");
      return;
    }

    const confirmSubmit = window.confirm("Are you sure you want to submit this sale?");
    if (!confirmSubmit) return;

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        alert("Authentication token missing. Please login again.");
        return;
      }

      const reqHeader = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const reqbody = {
        items: selectedProducts.map(product => ({
          productId: product._id,
          quantity: product.quantity
        }))
      };

      const response = await submitSaleApi(reqbody, reqHeader);

      if (response.status == 200) {
        alert("Sale submitted successfully!");

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Sales Summary', 14, 22);

        autoTable(doc, {
          startY: 30,
          head: [['Product Name', 'Quantity', 'MRP', 'Total']],
          body: selectedProducts.map(product => [
            product.productName,
            product.quantity,
            product.rate,
            (product.quantity * product.rate).toFixed(2)
          ])
        });

        doc.text(`Total Cost: $ ${totalCost.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
        doc.save('sales_summary.pdf');

        setSelectedProducts([]);
        setSearchedProducts([]);
        setSearchKey('');
        setTotalCost(0);
        setProductCount(0);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error in sale submission:", error);
      alert(error?.response?.data?.message || "Server error. Please try again later.");
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [selectedProducts]);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mt-2">
        <Container>
          <Navbar.Brand href="#" className='text-primary'>Inventory Bills</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <span className="nav-link text-primary">
              Welcome, <strong className='ms-1 me-5'>{staffName}</strong>
            </span>
            <Nav className="text-white">
              <Button variant="outline-light" size="sm" className='ms-3 border-primary text-dark' onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container">
        <div className="row mt-4 m-4">
          <div className="col-12 col-md-4 mb-2">
            <input
              onChange={(e) => setSearchKey(e.target.value)}
              type="text"
              value={searchKey}
              className="form-control"
              placeholder="Enter product name"
            />
          </div>
          <div className="col-12 col-md-3 mb-2">
            <button
              className="btn btn-success w-100"
              onClick={() => getSearchedProducts(searchKey)}
            >
              Search
            </button>
          </div>
        </div>

        {searchedProducts.length > 0 && searchKey && (
          <div className="row mt-3">
            <div className="col-12">
              <ul className="list-group">
                {searchedProducts
                  .filter((product) =>
                    product.productName.toLowerCase().startsWith(searchKey.toLowerCase())
                  )
                  .map((product) => (
                    <li
                      key={product._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      onClick={() => handleProductSelect(product)}
                      style={{ cursor: 'pointer' }}
                    >
                      <span>{product.productName}</span>
                      <span>₹{product.rate}</span>
                      <span>Stock: {product.quantity}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}

        <div className="row mt-5 m-2">
          <div className="table-responsive p-4">
            <Table striped bordered hover variant="secondary">
              <thead>
                <tr>
                  <th className="bg-primary text-dark">Product Name</th>
                  <th className="bg-primary text-dark">MRP</th>
                  <th className="bg-primary text-dark">Quantity</th>
                  <th className="bg-primary text-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.length > 0 ? (
                  selectedProducts.map((item) => (
                    <tr key={item._id}>
                      <td>{item.productName}</td>
                      <td>₹{item.rate}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <button className="btn btn-info btn-sm ms-2" onClick={() => handleIncrement(item._id)}>+</button>
                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDecrement(item._id)}>-</button>
                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleRemoveProduct(item._id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-warning">No product selected yet!</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="row mt-5 g-3 m-4">
          <div className="col-12 col-md-4">
            <input type="text" value={`Count: ${productCount}`} className="form-control" disabled />
          </div>
          <div className="col-12 col-md-4">
            <input type="text" value={`Total: ₹${totalCost.toFixed(2)}`} className="form-control" disabled />
          </div>
          <div className="col-12 col-md-4">
            <button type="submit" onClick={handleSubmitSale} className="btn btn-success w-100">
              Submit or Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SalesBoard;
