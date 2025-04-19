import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { staffLoginApi } from '../../services/allApi';
import Spinner from 'react-bootstrap/Spinner';

function StaffLogin() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [userDetails, setuserDetails] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        if (userDetails.username && userDetails.password && userDetails.email) {
            try {
                const result = await staffLoginApi(userDetails);
                if (result.status === 200) {
                    sessionStorage.setItem("staffs", JSON.stringify(result.data.staffs));
                    sessionStorage.setItem("token", result.data.token);
                    setIsLogin(true);
                    setTimeout(() => {
                        navigate("/staff/dashboard");
                        setuserDetails({
                            username: "",
                            email: "",
                            password: ""
                        });
                        setIsLogin(false);
                    }, 2000);
                } else {
                    if (result.response.status === 404) {
                        toast.info(result.response.data);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            toast.warning(`please fill the form`);
        }
    };

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

            <div
                className=''
                style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/035/163/758/non_2x/ai-generated-warehouse-interior-with-boxes-and-wooden-pallets-3d-rendering-warehouse-ai-generated-free-photo.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className='container'>
                    <div className="p-5">
                        <div className="d-flex justify-content-center align-items-center w-100">
                            <div className="p-5 text-primary shadow-2 bg-transparent border border-white rounded">
                                <form className='w-100'>
                                    <h2
                                        className="fw-bold mb-5 text-center"
                                        style={{
                                            background: 'linear-gradient(45deg,rgb(78, 196, 42),rgb(36, 37, 35))',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}
                                    >
                                        LOGIN
                                    </h2>
                                    <div className="mb-3">
                                        <input
                                            value={userDetails.username}
                                            onChange={(e) => setuserDetails({ ...userDetails, username: e.target.value })}
                                            type="text"
                                            placeholder='Staff Name'
                                            className='form-control rounded-2 text-primary bg-dark'
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            value={userDetails.email}
                                            onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })}
                                            type="email"
                                            placeholder='Email'
                                            className='form-control text-primary rounded-2 bg-dark'
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            value={userDetails.password}
                                            onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })}
                                            type="password"
                                            placeholder='Password'
                                            className='form-control text-primary rounded-2 bg-dark'
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <div>
                                            <button
                                                type='button'
                                                onClick={handleLogin}
                                                className='btn btn-primary w-100 rounded-2 mt-3'
                                            >
                                                Login {isLogin && <Spinner animation="border" variant="secondary" className='ms-3' />}
                                            </button>
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
    );
}

export default StaffLogin;
