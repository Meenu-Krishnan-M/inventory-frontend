import React, { useEffect, useState } from 'react';
import { getOutOfStockApi, totalProductApi, allProductApi } from '../../services/allApi';
import { Table, Form, Pagination } from 'react-bootstrap';

function AdminBoard() {
    const [outOfStock, setOutOfStock] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [allProduct, setAllProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

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

    const getTotalProducts = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const reqHeader = {
                'Authorization': `Bearer ${token}`,
            };
            const result = await totalProductApi(reqHeader);
            setTotalProducts(result.data.totalProducts);
        } catch (error) {
            console.error('Failed to fetch total products', error);
        }
    };

    useEffect(() => {
        const fetchOutOfStock = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const reqHeader = { Authorization: `Bearer ${token}` };
                const { data } = await getOutOfStockApi(reqHeader);
                setOutOfStock(data);
            } catch (err) {
                console.error("Failed to load out-of-stock products:", err);
            }
        };

        fetchOutOfStock();
        getTotalProducts();
        getAllProduct();
    }, []);

    // Filter based on search
    const filteredProducts = allProduct.filter(item =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (number) => setCurrentPage(number);

    return (
        <>
            <div className='p-3'>
                <div className="container-fluid">
                    <div className="row g-3 my-2">
                        {/* Dashboard Cards */}
                        <div className="col-md-6">
                            <div className="p-3 bg-dark shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div className="dashboard-container">
                                    <div className="text-light mt-3">
                                        <h4>Total Products</h4>
                                        <h2 className='text-primary text-center'>{totalProducts}</h2>
                                    </div>
                                </div>
                                <i className='bi bi-cart fs-3 text-primary'></i>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="p-4 bg-dark shadow-sm d-flex justify-content-around align-items-center rounded">
                                <h4 className='text-light mt-3'>Out of Stock</h4>
                                <ul>
                                    {outOfStock.length > 0 ? (
                                        outOfStock.map((product) => (
                                            <li className='text-primary' key={product._id}>
                                                {product.productName}
                                            </li>
                                        ))
                                    ) : (
                                        <p>No products are currently out of stock.</p>
                                    )}
                                </ul>
                                <i className='bi bi-cart fs-3 text-primary'></i>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar + Table */}
                    <div className="row mt-5 md:m-5 m-2">
                        <div className="col-md-4 mb-3 ms-auto">
                            <Form.Control
                                type="text"
                                placeholder="Search by product name"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page on new search
                                }}
                            />
                        </div>
                        <Table striped bordered variant="light" hover size="sm">
                            <thead>
                                <tr>
                                    <th width="200" className='bg-primary'>Index</th>
                                    <th width="200" className='bg-primary'>Product Name</th>
                                    <th width="200" className='bg-primary'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.length > 0 ? (
                                    currentProducts.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{indexOfFirstProduct + index + 1}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.quantity}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className='text-center text-warning'>
                                            No matching products found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                        {/* Pagination controls */}
                        {totalPages > 1 && (
                            <Pagination className="justify-content-center">
                                {[...Array(totalPages)].map((_, idx) => (
                                    <Pagination.Item
                                        key={idx + 1}
                                        active={currentPage === idx + 1}
                                        onClick={() => handlePageChange(idx + 1)}
                                    >
                                        {idx + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminBoard;
