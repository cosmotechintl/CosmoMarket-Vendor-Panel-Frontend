import React from 'react'
import "./SettingPage.scss"
import Card from "../../components/Card/Card"
import { MdGroups,MdPolicy,MdMiscellaneousServices   } from "react-icons/md";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { LiaBusinessTimeSolid } from "react-icons/lia";
const SettingPage = () => {
  return (
    <div className="settingPageContainer">
        <div className="settingPageContents">
            <div className="headerTitle">Settings</div>
            <div className="settingsCard">
             <Link Link to ="group" style={{ textDecoration:"none" }}>
                <Card icon={<MdGroups/>} title="Access Groups"/>
              </Link>
              <Link Link to ="businessHour" style={{ textDecoration:"none" }}>
                <Card icon={<LiaBusinessTimeSolid/>} title="Business Hours"/>
              </Link>
              <Link Link to ="workingDays" style={{ textDecoration:"none" }}>
                <Card icon={<HiOutlineCalendarDays/>} title="Working Days"/>
              </Link>
                <Card icon={<MdPolicy/>} title="Password Policy"/>
                <Card icon={<MdMiscellaneousServices/>} title="System Configuration"/>
            </div>  
        </div>
    </div>
  )
}

export default SettingPage