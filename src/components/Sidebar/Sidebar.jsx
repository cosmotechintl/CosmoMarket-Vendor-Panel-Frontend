import React from 'react'
import "./Sidebar.scss"
import { FiUsers } from "react-icons/fi";
import { GiShoppingCart } from "react-icons/gi";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { GiSoccerField } from "react-icons/gi";
import { CiSettings } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { MdDesignServices } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { TbReportSearch } from "react-icons/tb";
import { PiSignOut } from "react-icons/pi";
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import { performLogout } from '../../auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config';
import { adminRequest, updateAuthToken } from '../../utils/requestMethods';
const iconMapping = {
  FiUsers,
  LiaBusinessTimeSolid,
  IoPersonOutline,
  CiSettings,
  GiShoppingCart,
  GiSoccerField
};
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeURL = location.pathname.split('/')[2];
  const handleSignout = () => {
    performLogout(() => {
      toast.success("Logging Out");
      navigate("/");
    });
  }
  updateAuthToken();
  const { data, loading, error } = useFetch(`${BASE_URL}/navigation`, adminRequest);
  if (loading) return <div>Loading...</div>;
  if (!data || !data.data) return <div>No data available</div>;
  const sortedData = data.data.sort((a, b) => a.position - b.position);
  return (
    <div className="sidebarContainer">
      <div className="sidebarContents">
        <div className="sidebarMenuContainer">
          {sortedData.map((item, index) => {
            const IconComponent = iconMapping[item.icon];
            return (
              <Link to={`/admin${item.navigation}`} style={{ textDecoration: "none" }} key={index}>
                <SidebarMenu
                  icon={IconComponent ? <IconComponent /> : null}
                  title={item.name}
                // isActive={!activeURL || activeURL === "reports" || activeURL === "profile"}
                />
              </Link>
            );
          })}
          <SidebarMenu
            icon={<PiSignOut />}
            title="Sign Out"
            onClick={handleSignout}
          />
        </div>
      </div>
      <ToastContainer position='top-center'/>
    </div>
  )
}

export default Sidebar