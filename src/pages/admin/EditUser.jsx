import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { editStaffContext } from '../../context/ContextShare';
import { updateStaffApi } from '../../services/allApi';
import { ToastContainer, toast } from 'react-toastify';

const EditUser = ({ data }) => {
    const {editStaffResponse,setEditStaffResponse} = useContext(editStaffContext)
    const [staffInput, setStaffDetails] = useState({ id:data?._id,
        username: data?.username, email: data?.email, password: data?.password
    })
    console.log(staffInput);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     const handleUpdateStaff = async () => {
        const { id, username, email, password } = staffInput
        if (username && email && password) {
          const token = sessionStorage.getItem("token")
          if (token) {
            const reqHeader = {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
            //make api call
            try {
              const result = await updateStaffApi(id,staffInput, reqHeader)
              // console.log(result);
              if (result.status == 200) {
                toast.success(` Staff updated successfully`)
                handleClose()
                setEditStaffResponse(result)
              }
            } catch (err) {
              console.log(err);
            }
          }
        } else {
          toast.warning('please fill the form completely')
        }
      }
    


    return (

        <>
            <Button variant="primary" className='text-center text-warning ' onClick={handleShow}><FontAwesomeIcon icon={faEdit} />
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>Update Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div >
                            <div className="flex-column">
                                <div className="mb-3">
                                    <input value={staffInput.username} onChange={(e) => setStaffDetails({ ...staffInput, username: e.target.value })} type="text" className='form-control' placeholder='User Name' />
                                </div>
                                <div className="mb-3">
                                    <input value={staffInput.email} onChange={(e) => setStaffDetails({ ...staffInput, email: e.target.value })} type="text" className='form-control' placeholder='Email' />
                                </div>
                                <div className="mb-3">
                                    <input value={staffInput.password} onChange={(e) => setStaffDetails({ ...staffInput, password: e.target.value })} type="text" className='form-control' placeholder='Password' />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleUpdateStaff} variant="primary">
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='top-center' theme='colored' autoClose={1000} />
        </>
    )
}

export default EditUser