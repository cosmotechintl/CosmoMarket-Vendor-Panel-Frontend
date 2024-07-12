import React, { useEffect, useState } from "react";
import CustomForm from "../../../components/CustomForm/CustomForm";
import "./EditFutsal.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethods";
import { BASE_URL } from "../../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../components/Loader/Loader";

const EditFutsal = () => {
  const location = useLocation();
  const activeURL = location.pathname.split("/")[4];

  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/court/get`, {
          name: `${activeURL}`,
        });
        setData(response.data);
        setFormData({
          name: response.data.data.name,
          description: response.data.data.description,
          image: response.data.data.image,
        });
        console.log(response.data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, [activeURL]);

  updateAuthToken();

  if (!data || !data.data) {
    return <Loader />;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await toast.promise(
        adminRequest.post(`${BASE_URL}/court/edit`, {
          name: activeURL,
          name: formData.name,
          description: formData.description,
          image: formData.image,
        }),
        {
          pending: "Your request is being processed",
        }
      );
      if (response.data.code == 0) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update data");
    }
  };
  const fields = [
    {
      name: "name",
      label: "Court Name",
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
  ];

  return (
    <div className="editCourtContainer">
      <CustomForm
        header="Edit Court Details"
        fields={fields}
        createButtonLabel="Update Data"
        flexDirection="column"
        onSubmit={handleSubmit}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default EditFutsal;
