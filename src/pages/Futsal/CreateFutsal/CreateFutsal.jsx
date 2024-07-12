import React, { useEffect, useState } from "react";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethods";
import { BASE_URL } from "../../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomForm from "../../../components/CustomForm/CustomForm";

const CreateFutsal = () => {
  const initialFormData = {
    name: "",
    description: "",
    image: "",
    price: "",
    location: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/futsal/create`, {
          name: formData.name,
          description: formData.description,
          image: "image",
          price: formData.price,
          location: formData.location,
        }),
        {
          pending: "Processing your request",
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
    {
      name: "name",
      label: "Futsal Name",
      type: "text",
      value: formData.name,
      onChange: handleChange,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      value: formData.description,
      onChange: handleChange,
    },
    {
      name: "image",
      label: "Image",
      type: "file",
      value: formData.image,
      onChange: handleChange,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      value: formData.price,
      onChange: handleChange,
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      value: formData.location,
      onChange: handleChange,
    },
  ];

  return (
    <div className="createFutsalContainer">
      <CustomForm
        header="Create Futsal"
        fields={fields}
        flexDirection="column"
        createButtonLabel="Create Futsal"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateFutsal;
