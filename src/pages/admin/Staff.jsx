import React, { useContext, useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar';
import { Button, Modal, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { allStaffApi, removeStafftApi, staffRegisterApi } from '../../services/allApi';
import EditUser from './EditUser';
import { editStaffContext } from '../../context/ContextShare';

function Staff() {
  const { editStaffResponse, setEditStaffResponse } = useContext(editStaffContext);

  const [staffInput, setStaffDetails] = useState({
    username: "", email: "", password: ""
  });

  const [allStaff, setAllStaff] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const register = async (e) => {
    e.preventDefault();
    if (staffInput.username && staffInput.email && staffInput.password) {
      try {
        const result = await staffRegisterApi(staffInput);
        if (result.status === 200) {
          toast.success(`Staff added successfully`);
          setStaffDetails({ username: "", email: "", password: "" });
          getAllStaff();
        } else if (result.response?.status === 406) {
          toast.info(result.response.data);
          setStaffDetails({ username: "", email: "", password: "" });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warning(`Please fill the form completely`);
    }
  };

  const getAllStaff = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      const result = await allStaffApi(reqHeader);
      setAllStaff(result.data);
    }
  };

  const removeStaff = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      try {
        const result = await removeStafftApi(id, reqHeader);
        if (result.status === 200) {
          toast.error('Staff removed successfully');
          getAllStaff();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getAllStaff();
  }, [editStaffResponse]);

  return (
    <>
      <div className='container-fluid bg-white min-vh-100'>
        <div className="row">
          <div className="col-2 col-md-2 bg-dark">
            <AdminSidebar />
          </div>
          <div className="col-10 col-md-10">
            <div>
              <Button
                variant="primary"
                className='text-center md:ms-5 m-2 mt-5'
                onClick={handleShow}
              >
                Add Staff
              </Button>

              {/* Add Staff Modal */}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add New Staff</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <div className="flex-column">
                      <div className="mb-3">
                        <input
                          value={staffInput.username}
                          onChange={(e) => setStaffDetails({ ...staffInput, username: e.target.value })}
                          type="text"
                          className='form-control'
                          placeholder='User Name'
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          value={staffInput.email}
                          onChange={(e) => setStaffDetails({ ...staffInput, email: e.target.value })}
                          type="email"
                          className='form-control'
                          placeholder='Email'
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          value={staffInput.password}
                          onChange={(e) => setStaffDetails({ ...staffInput, password: e.target.value })}
                          type="password"
                          className='form-control'
                          placeholder='Password'
                        />
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
                  <Button onClick={register} variant="primary">Add</Button>
                </Modal.Footer>
              </Modal>
            </div>

            {/* Staff List Table */}
            <div className="row mt-5 md:m-5 m-2">
              <Table striped bordered hover variant="light" size="sm" responsive>
                <thead>
                  <tr>
                    <th className='bg-info' width="100">Sl No</th>
                    <th className='bg-info'>Staff Name</th>
                    <th className='bg-info'>Email</th>
                    <th className='bg-info'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allStaff?.length > 0 ? (
                    allStaff.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>
                          <div className="d-flex flex-wrap gap-2 justify-content-start">
                            <EditUser data={item} />
                            <Button
                              onClick={() => removeStaff(item?._id)}
                              className='text-danger'
                              variant="outline-danger"
                            >
                              <FontAwesomeIcon className='text-white' icon={faTrash} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className='text-center text-warning'>
                        No Staff On Db..!!
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        <ToastContainer position='top-center' theme='colored' autoClose={1000} />
      </div>
    </>
  );
}

export default Staff;
