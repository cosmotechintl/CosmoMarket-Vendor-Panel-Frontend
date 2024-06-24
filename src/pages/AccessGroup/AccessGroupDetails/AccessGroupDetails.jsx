import React, { useEffect, useState } from 'react'
import "./AccessGroupDetails.scss"
import { adminRequest, updateAuthToken } from '../../../utils/requestMethods'
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from '../../../utils/config';
import { FaArrowLeftLong } from "react-icons/fa6";
import Loader from '../../../components/Loader/Loader';

const AccessGroupDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const location = useLocation();
  const activeURL = decodeURIComponent(location.pathname.split('/')[5]); 

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/accessGroup/get/detail`, {
          "name": `${activeURL}`
        });
        toast.success(response.data.message);
        setData(response.data.data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, [activeURL, refresh]);
  updateAuthToken();
  const handleBackClick=(e)=>{
    e.preventDefault();
    navigate(-1);
  }
  return (
    <div className="accessGroupDetailsContainer">
      <div className="accessGroupDetailsContents">
        <div className="accessGroupDetailsTop">
            <FaArrowLeftLong className="backIcon" onClick={handleBackClick}/>
            <h1 className="headerDetails">Access Group Details</h1>
        </div>
        { data && data.type ? 
        <>
            <div className="accessGroupDetailsMiddle">
              <span className="nameContainer">
                <span className="nameHeader">Name</span>
                <span className="nameContents">{data.name}</span>
              </span>
              <span className="descContainer">
                <span className="descHeader">Description</span>
                <span className="descContents">{data.description}</span>
              </span>
              <span className="typeContainer">
                <span className="typeHeader">Type</span>
                <span className="typeContents">{data.type.name}</span>
              </span>
            </div>
            <div className="accessGroupDetailsBottom">
              <span className="bottomHeader">Roles</span>
              {data.accessGroupRoleMaps.map((roles, index) => (
                <span className="rolesList" key={index}>
                  {roles.roles.parentName === "Root" && roles.isActive && (
                    <span className="rolesParent">{roles.roles.name}</span>
                  )}
                  <span className="rolesChild">
                    {data.accessGroupRoleMaps
                      .filter(childRole => childRole.roles.parentName === roles.roles.name && childRole.isActive)
                      .map((filteredRole, childIndex) => (
                        <li key={childIndex}>{filteredRole.roles.name}</li>
                      ))}
                  </span>
                </span>
              ))}
            </div>
          </>
        : <Loader/> }
      </div>
      <ToastContainer position='top-center'/>
    </div>
  )
}

export default AccessGroupDetails