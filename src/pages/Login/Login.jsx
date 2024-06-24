import React, { useState } from 'react'
import "./Login.scss"
import logo from "../../assets/logo-transparent.png"
import login from "../../assets/login.png"
import { MdOutlineEmail, MdOutlinePassword  } from "react-icons/md";
import { loginAdmin } from '../../services/loginService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { performLogin } from '../../auth';
import { useNavigate } from 'react-router-dom';
const Login = () => {  
    const navigate = useNavigate();
    const [loginDetail, setLoginDetail] = useState({
        username:'',
        password:''
    });
    const handleChange = (event,field) => {
        const changedValue = event.target.value;
        setLoginDetail({
            ...loginDetail,
            [field]:changedValue
        });
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        //validation

        //submit to server
        loginAdmin(loginDetail).then((data)=>{
            if(data.code == 0){
                performLogin(data,()=>{
                    toast.success(data.message);
                    //redirect to dashboard
                    navigate("/admin/dashboard");
                })
            }
            else{
                toast.error(data.message);
            }
        }).catch(error=>{
            console.log(error);
            toast.error(error.message);
        });
    }
    const isFormValid = loginDetail.username && loginDetail.password;
    return (
        <div className='loginContainer'>
            <div className="loginContents">
                <div className="loginContentsLeft">
                    <img src={login} className="loginImg" />
                </div>
                <div className="loginContentsRight">
                    <div className="logoContainer">
                        {/* <img src={logo} alt="logo" className='companyLogo' /> */}
                    </div>
                    <div className="headerContainer">
                        <span className="header">COSMOMARKET VENDOR</span>
                        <span className="desc">Please sign in to continue</span>
                    </div>
                    <div className="loginForm">
                        <div className="inputField">
                            <MdOutlineEmail className='inputFieldIcon'/>
                            <input 
                                type="text" 
                                name="email" 
                                id="email" 
                                placeholder='Enter your username' 
                                className='emailField' 
                                value={loginDetail.username} 
                                onChange={(e)=>handleChange(e,'username')}
                            />
                        </div>
                        <div className="inputField">
                            <MdOutlinePassword className='inputFieldIcon'/>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder='Enter your password' 
                                className='passwordField' 
                                value={loginDetail.password} 
                                onChange={(e)=>handleChange(e,'password')}
                            />
                        </div>
                        <div className="loginButton">
                            <button 
                                type="submit" 
                                className='submitButton' 
                                onClick={handleFormSubmit}
                                disabled={!isFormValid}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" reverseOrder={true}/>
        </div>
    )
}

export default Login