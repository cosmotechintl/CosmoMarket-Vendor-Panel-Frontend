import React, { useState } from 'react';
import CustomForm from '../../components/CustomForm/CustomForm';
import "./ChangePassword.scss";
import { adminRequest, updateAuthToken } from "../../utils/requestMethods";
import { BASE_URL } from '../../utils/config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
const ChangePassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        retypeNewPassword: ''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await toast.promise(
                adminRequest.post(`${BASE_URL}/vendorUser/changePassword`, {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                retypeNewPassword: formData.retypeNewPassword
            }),
            {
                pending: 'Processing your request',
            });
           if(response.data.code==0){
            toast.success(response.data.message,{
                autoClose: 500,
                onClose: () => navigate("/")
            }
            );
           }
           else{
            toast.error(response.data.message);
           }
        } catch (error) {
            toast.error(error.message);
        }
    };
    updateAuthToken();
    const fields = [
        { name: 'oldPassword',  label:"Old Password", type: 'password', value: formData.oldPassword, onChange: handleChange },
        { name: 'newPassword', label:"New Password", type: 'password', value: formData.newPassword, onChange: handleChange },
        { name: 'retypeNewPassword', label:"Confirm Password", type: 'password', value: formData.retypeNewPassword, onChange: handleChange },
    ];
    return (
        <div className="changePasswordContainer">
            <CustomForm
                header='Change Password'
                fields={fields}
                flexDirection='column'
                createButtonLabel='Change Password'
                onSubmit={handleSubmit}
            />
            <ToastContainer position="top-center" draggable />
        </div>
    );
};
export default ChangePassword;
