import React, { useEffect, useState } from 'react';
import "./CreateAdmin.scss";
import CustomForm from '../../../components/CustomForm/CustomForm';
import { adminRequest, updateAuthToken } from '../../../utils/requestMethods';
import { BASE_URL } from '../../../utils/config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateAdmin = () => {
  const initialFormData = {
    fullName: '',
    userName:'',
    mobileNumber: '',
    address: '',
    email: '',
    accessGroup: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [accessGroups, setAccessGroups] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAccessGroups = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/accessGroup`, {
          firstRow: 0,
          pageSize: 0
        });
        setAccessGroups(response.data.data.records);
        updateAuthToken();
      } catch (error) {
        toast.error(error.message || "Failed to fetch access groups");
      }
    };
    fetchAccessGroups();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/vendorUser/create`, {
          name: formData.fullName,
          username: formData.userName,
          mobileNumber: formData.mobileNumber,
          address: formData.address,
          email: formData.email,
          accessGroup: {
            name: formData.accessGroup
          }
        }),
        {
          pending: 'Processing your request',
        }
      );
      if (response.data.code == 0) {
        toast.success(response.data.message);
      } 
      if (response.data.code != 0) {
        toast.error(response.data.message);
      } 
      setFormData(initialFormData);
    } catch (error) {
      toast.error(error.message || "Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { name: 'fullName', label: 'Full Name', type: 'text', value: formData.fullName, onChange: handleChange },
    { name: 'userName', label: 'Username', type: 'text', value: formData.userName, onChange: handleChange },
    { name: 'email', label: 'Email', type: 'email', value: formData.email, onChange: handleChange, tail: 'Activation links will be sent to this email.' },
    { name: 'mobileNumber', label: 'Mobile Number', type: 'text', value: formData.mobileNumber, onChange: handleChange },
    { name: 'address', label: 'Address', type: 'text', value: formData.address, onChange: handleChange },
    { 
      name: 'accessGroup', 
      label: 'Access Group', 
      type: 'select', 
      value: formData.accessGroup, 
      onChange: handleChange,
      options: accessGroups.map(group => ({ label: group.name, value: group.name })) 
    },
  ];

  return (
    <div className='createAdminContainer'>
      <CustomForm 
        header="Create System User"
        fields={fields}
        flexDirection="row"
        createButtonLabel='Create User'
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <ToastContainer position='top-center' />
    </div>
  );
}

export default CreateAdmin;
