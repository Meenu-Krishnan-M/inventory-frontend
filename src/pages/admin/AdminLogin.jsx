import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { adminLoginApi } from '../../services/allApi';

function AdminLogin() {

  const navigate = useNavigate();

  const [userDetails, setuserDetails] = useState({
    username: "",
    password: ""
  })
  console.log(userDetails);


  const handleLogin = async () => {
    const { username, password } = userDetails
    if (!username || !password) {
      toast.info('Please enter email and password')
    }
    else {
      const result = await adminLoginApi(userDetails)
      console.log(result);
      if (result.status == 200) {
        toast.success(`logged in Successfully`)
        sessionStorage.setItem("username", JSON.stringify(result.data.username))
        sessionStorage.setItem("token", (result.data.token))
        setuserDetails({
          username: "",
          password: ""
        })
        setTimeout(() => {
          navigate('/admin/dashboard')
        }, 1500)
      } else if (result.status == 406) {
        toast.warning(result.response.data)
        setuserDetails({
          username: "",
          password: ""
        })
      }
      else {
        toast.error(`something went wrong`)
        setuserDetails({
          username: "",
          password: ""
        })
      }
    }

  }

  return (
    <>
     <style>
                {`
                    .form-control::placeholder {
                        color:#777d78!important; 
                        opacity:1;
                    }
                `}
            </style>

      <div className='' style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/035/163/758/non_2x/ai-generated-warehouse-interior-with-boxes-and-wooden-pallets-3d-rendering-warehouse-ai-generated-free-photo.jpg)' }}>

        <div className='container'>
          <div className=" p-5">
            <div className="d-flex justify-content-center align-items-center w-100 ">
              <div className=" p-5 text-light shadow-2 bg-transparent border border-white rounded ">

                <form className='w-100'>
                  <h2
                    className="fw-bold mb-5 text-center"
                    style={{
                      background: 'linear-gradient(45deg,rgb(78, 196, 42),rgb(36, 37, 35))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >ADMIN</h2>
                    <div className="mb-3">
                      <input value={userDetails.username} onChange={(e) => setuserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Admin Name' className='form-control rounded-2 text-primary bg-dark' />
                    </div>
                    <div className="mb-3">
                      <input value={userDetails.password} onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} type="password" placeholder='Password' className='form-control text-primary rounded-2 bg-dark' />
                    </div>
                    <div className="mb-3">
                      <div>
                        <button type='button' onClick={handleLogin} className='btn btn-primary w-100 rounded-2 mt-3'>Login</button>
                      </div>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={1000} />
      </div>
    </>
  )
}

export default AdminLogin