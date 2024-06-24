import React from 'react'
import { Route, Routes } from 'react-router-dom';
import UserProfile from "../../components/Userprofile/UserProfile";
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import "./Homepage.scss";
import SettingPage from '../SettingPage/SettingPage';
import AccessGroupPage from '../AccessGroup/AccessGroupList/AccessGroupList';
import CreateAccessGroup from '../AccessGroup/CreateAccessGroup/CreateAccessGroup';
import AdminList from '../Admin/AdminList/AdminList';
import CreateAdmin from '../Admin/CreateAdmin/CreateAdmin';
import CustomerList from '../Customer/CustomerList/CustomerList';
import ReportPage from '../ReportPage/ReportPage';
import ChangePassword from '../ChangePassword/ChangePassword';
import { ToastContainer, toast } from "react-toastify";
import AdminDetails from '../Admin/AdminDetails/AdminDetails';
import EditAdmin from '../Admin/EditAdmin/EditAdmin';
import AccessGroupDetails from '../AccessGroup/AccessGroupDetails/AccessGroupDetails';
import BusinessHourList from '../BusinessHours/BusinessHourList/BusinessHourList';
const Homepage = () => {
  return (
    <div className="homepageContainer">
        <div className="homepageContents">
          <div className="homepage__top">
            <div className="navbarArea">
              <Navbar/>
            </div>
          </div>
          <div className="middle">
            <div className="homepageContents__left">
                <div className="sidebarArea">
                  <Sidebar/>
                </div>
            </div>
            <div className="homepageContents__right">
              <Routes>
                <Route path="profile" element={<UserProfile />}/>
                <Route path="changePassword" element={<ChangePassword />}/>
                <Route path="vendorUser" element={<AdminList />}/>
                <Route path="vendorUser/create" element={<CreateAdmin />}/>
                <Route path="vendorUser/view/:email" element={<AdminDetails />}/>
                <Route path="vendorUser/edit/:email" element={<EditAdmin />}/>
                <Route path="businessHour" element={<BusinessHourList />}/>
                <Route path="customer" element={<CustomerList/>}/>
                <Route path="reports" element={<ReportPage/>}/>
                <Route path="setting" element={<SettingPage />}/>
                <Route path="setting/group" element={<AccessGroupPage />}/>
                <Route path="setting/group/create" element={<CreateAccessGroup />}/>
                <Route path="setting/group/view/:name" element={<AccessGroupDetails />}/>
              </Routes>
            </div>
          </div>
        </div>
      <ToastContainer position="top-center" draggable />
    </div>  
  )
}
export default Homepage