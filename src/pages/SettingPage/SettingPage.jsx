import React from 'react'
import "./SettingPage.scss"
import Card from "../../components/Card/Card"
import { MdGroups,MdPolicy,MdMiscellaneousServices   } from "react-icons/md";
import { Link } from 'react-router-dom';
const SettingPage = () => {
  return (
    <div className="settingPageContainer">
        <div className="settingPageContents">
            <div className="headerTitle">Settings</div>
            <div className="settingsCard">
              <Link to ="group" style={{ textDecoration:"none" }}>
                <Card icon={<MdGroups/>} title="Access Groups"/>
              </Link>
                <Card icon={<MdPolicy/>} title="Password Policy"/>
                <Card icon={<MdMiscellaneousServices/>} title="System Configuration"/>
            </div>  
        </div>
    </div>
  )
}

export default SettingPage