import React, { useEffect, useState } from "react";
import { adminRequest, updateAuthToken } from '../../../utils/requestMethods';
import { BASE_URL } from '../../../utils/config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomForm from "../../../components/CustomForm/CustomForm";

const CreateProduct = () => {
  const initialFormData = {
    name: "",
    description: "",
    price: "",
    brand: "",
    color: "",
    image: "",
    size: "",
    quantity: "",
    category: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //     const fetchProductCategories = async () => {
  //       try {
  //         const response = await adminRequest.post(`${BASE_URL}/productCategory`, {
  //           firstRow: 1,
  //           pageSize: 2
  //         });
  //         setCategories(response.data.data.records);
  //         updateAuthToken();
  //       } catch (error) {
  //         toast.error(error.message || "Failed to fetch product categories");
  //       }
  //     };
  //     fetchProductCategories();
  //   }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/product/create`, {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          brand: formData.brand,
          color: formData.color,
          image: "image",
          size: formData.size,
          quantity: formData.quantity,
          category: {
            name: "Electronics"
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
    { name: 'name', label: 'Product Name', type: 'text', value: formData.name, onChange: handleChange },
    { name: 'price', label: 'Price', type: 'number', value: formData.price, onChange: handleChange},
    { name: 'brand', label: 'Brand', type: 'text', value: formData.brand, onChange: handleChange },
    { name: 'color', label: 'Color', type: 'text', value: formData.color, onChange: handleChange },
    { name: 'size',  label: 'Size', type: 'text', value: formData.size, onChange: handleChange },
    { name: 'quantity', label: 'Quantity', type: 'number', value: formData.quantity, onChange: handleChange },
    { name: 'description', label: 'Description', type: 'textarea', value: formData.description, onChange: handleChange },
    { name: 'image', label: 'Image', type: 'file', value: formData.image, onChange: handleChange },
    // { 
    //   name: 'category', 
    //   label: 'Category', 
    //   type: 'select', 
    //   value: formData.category, 
    //   onChange: handleChange,
    //   options: category.map(group => ({ label: group.name, value: group.name })) 
    // },
  ];

  return (
    <div className="createProductContainer">
        <CustomForm 
            header="Create Product"
            fields={fields}
            flexDirection="row"
            createButtonLabel='Create Product'
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
        />
      <ToastContainer position='top-center' />
    </div>
  );
};

export default CreateProduct;
